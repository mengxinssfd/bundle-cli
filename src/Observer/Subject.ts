import Observer from '@/Observer/Observer';

export default interface Subject {
  attach(observes: Observer): void;
  detach(observes: Observer): void;
  notifyUpdate(): void;
  notifyDestroy(): void;
}
