/** Interface for publisher at Observer pattern. */
interface IPublisher<T> {

	/** Add IObserver object to subscribers collection. */
	subscribe(observer: ISubscriber<T>): void;

	/** Delete IObserver object from subscribers collection. */
	unsubscribe(observer: ISubscriber<T>): void;

	/** Notify all subscribers about state changing. */
	notify(args: T): void;
}

/** Interface for publisher at Observer pattern. */
interface ISubscriber<T> {

	/**
	 * @param arg TODO.
	 */
	update(arg: T): void;
}

/** Interface for Subscriber at Observer pattern. */
abstract class Publisher<T> implements IPublisher<T> {

	/**  */
	private readonly observers: Set<ISubscriber<T>>;

	public constructor() {
		this.observers = new Set();
	}

	/**
	 * @param observer TODO.
	 */
	public subscribe(observer: ISubscriber<T>): void {
		this.observers.add(observer);
	}

	/**
	 * @param observer TODO.
	 */
	public unsubscribe(observer: ISubscriber<T>): void {
		this.observers.delete(observer);
	}

	/**
	 * @param arg TODO.
	 */
	public notify(arg: T): void {
		this.observers.forEach((observer: ISubscriber<T>) => {
			observer.update(arg);
		});
	}
}

/**  */
class TurnGenerator<T> extends Publisher<T> {

	private playersCount: number;

	/**  */
	public currentPlayerIndex: number;

	public constructor(playersCount: number) {
		super();
		this.playersCount = playersCount;
		this.currentPlayerIndex = 0;
	}

	/**  */
	public next(): void {
		this.currentPlayerIndex++;
		if (this.currentPlayerIndex >= this.playersCount) {
			this.currentPlayerIndex = 0;
		}
	}
}

/**  */
class DiceGenerator<T> extends Publisher<T> {

	private sidesCount: number;

	public constructor(sidesCount: number) {
		this.sidesCount = sidesCount;
	}

	/**  */
	public rollDice(): number {
		return Math.floor(Math.random() * (this.sidesCount) + 1);
	}
}

const dice: DiceGenerator = new DiceGenerator(6);
for (let i = 0; i < 30; i++) {
	console.log(dice.rollDice());
}

const turnGenerator: TurnGenerator<number> = new TurnGenerator();
