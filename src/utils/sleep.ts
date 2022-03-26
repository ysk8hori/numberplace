export default function sleep(msec: number) {
  return new Promise(resolve => {
    setTimeout(resolve, msec);
  });
}
