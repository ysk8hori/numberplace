export default class Utils {
  public static createArray(count: number): number[] {
    return [...Array(count)].map((value, index) => index);
  }
  public static shuffle<T>(array: T[]): T[] {
    for (var i = array.length - 1; 0 < i; i--) {
      var r = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[r];
      array[r] = tmp;
    }
    return array;
  }
  public static async sleep(time: number) {
    new Promise(resolve => setTimeout(resolve, time));
  }
}
