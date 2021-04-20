export default interface IFirebaseDataState<T> {
  status: string;
  data?: T | undefined;
  error?: any;
}
