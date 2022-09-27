import { types } from "@algo-builder/web";
import { assert } from "chai";

import { RUNTIME_ERRORS } from "../../src/errors/errors-list";
import { AccountStore, Runtime } from "../../src/index";
import { useFixture } from "../helpers/integration";
import { expectRuntimeError } from "../helpers/runtime-errors";

describe("Pooled Transaction Fees Test", function () {
	useFixture("deploy-asa");
	const initialBalance = 1e30;
	let john: AccountStore;
	let bob: AccountStore;
	let elon: AccountStore;
	let alice: AccountStore;
	let assetId: number;
	let runtime: Runtime;

	this.beforeEach(() => {
		john = new AccountStore(initialBalance, "john");
		bob = new AccountStore(initialBalance, "bob");
		alice = new AccountStore(initialBalance, "alice");
		elon = new AccountStore(0, "elon");
		runtime = new Runtime([john, bob, alice, elon]); // setup test
	});

	function setupAsset(): void {
		// create asset
		assetId = runtime.deployASA("asa", {
			creator: { ...john.account, name: "john" },
		}).assetIndex;
	}

	// helper function
	function syncAccounts(): void {
		john = runtime.getAccount(john.address);
		bob = runtime.getAccount(bob.address);
		alice = runtime.getAccount(alice.address);
		elon = runtime.getAccount(elon.address);
	}

	it("Should pass if second account doesn't pay fees and first account is covering fees", () => {
		const amount = 1e4 + 122;
		const initialBalance = john.balance();
		// group with fee distribution
		const groupTx: types.ExecParams[] = [
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: john.account,
				toAccountAddr: alice.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 2000 },
			},
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: alice.account,
				toAccountAddr: bob.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 0 },
			},
		];

		runtime.executeTx(groupTx);

		syncAccounts();
		assert.equal(bob.balance(), BigInt(initialBalance) + BigInt(amount));
		assert.equal(alice.balance(), BigInt(initialBalance));
		assert.equal(john.balance(), initialBalance - BigInt(amount) - 2000n);
	});

	it("Should fail if fees is not enough", () => {
		const amount = 1e4 + 122;
		// group with fee distribution
		const groupTx: types.ExecParams[] = [
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: john.account,
				toAccountAddr: alice.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 1000 },
			},
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: alice.account,
				toAccountAddr: bob.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 0 },
			},
		];

		// Fails if fees is not enough
		expectRuntimeError(
			() => runtime.executeTx(groupTx),
			RUNTIME_ERRORS.TRANSACTION.FEES_NOT_ENOUGH
		);
	});

	it("Should unfunded accounts be able to issue transactions of group size 3", () => {
		const amount = 4000;
		const fee = 3000;
		// group with fee distribution. Pooled transaction fee
		const groupTx: types.ExecParams[] = [
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: john.account,
				toAccountAddr: alice.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: fee }, // this covers fee of entire group txns.
			},
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: alice.account,
				toAccountAddr: bob.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 0 }, // with 0 txn fee.
			},
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: bob.account,
				toAccountAddr: john.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 0 }, // with 0 txn fee.
			},
		];

		runtime.executeTx(groupTx);

		syncAccounts();
		assert.equal(john.balance(), BigInt(initialBalance) - BigInt(fee));
		assert.equal(alice.balance(), BigInt(initialBalance));
		assert.equal(bob.balance(), BigInt(initialBalance));
	});

	it("Should unfunded accounts be able to issue transactions and opt-in", () => {
		setupAsset();
		const amount = 4000;
		const fee = 3000;
		// group with fee distribution
		const groupTx: types.ExecParams[] = [
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: john.account,
				toAccountAddr: alice.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: 0 }, // with 0 txn fee
			},
			{
				type: types.TransactionType.TransferAlgo,
				sign: types.SignType.SecretKey,
				fromAccount: alice.account,
				toAccountAddr: elon.address,
				amountMicroAlgos: amount,
				payFlags: { totalFee: fee }, // this covers fee of entire group txns
			},
			{
				type: types.TransactionType.OptInASA,
				sign: types.SignType.SecretKey,
				fromAccount: elon.account,
				assetID: assetId,
				payFlags: { totalFee: 0 }, // with 0 txn fee
			},
		];

		runtime.executeTx(groupTx);

		syncAccounts();
		assert.equal(john.balance(), BigInt(initialBalance) - BigInt(amount));
		assert.equal(alice.balance(), BigInt(initialBalance) - BigInt(fee));
		assert.equal(elon.balance(), BigInt(initialBalance) + BigInt(amount));
		// verify holding
		assert.isDefined(elon.getAssetHolding(assetId));
	});

});
