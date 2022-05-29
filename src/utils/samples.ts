import { BlockSize } from '@ysk8hori/numberplace-generator';
import { MyGame } from './typeUtils';
import { markFixed } from './utils';

export const blockSize_2_2: BlockSize = { height: 2, width: 2 };
export const puzzle_2_2: MyGame = markFixed({
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"4"},{"pos":[2,0]},{"pos":[3,0],"answer":"2"},{"pos":[0,1],"answer":"2"},{"pos":[1,1]},{"pos":[2,1],"answer":"4"},{"pos":[3,1]},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"4"},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"2"},{"pos":[3,3]}]}',
  ),
});
export const solved_2_2: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"1"},{"pos":[1,0],"answer":"4","isFix":true},{"pos":[2,0],"answer":"3"},{"pos":[3,0],"answer":"2","isFix":true},{"pos":[0,1],"answer":"2","isFix":true},{"pos":[1,1],"answer":"3"},{"pos":[2,1],"answer":"4","isFix":true},{"pos":[3,1],"answer":"1"},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"2"},{"pos":[2,2],"answer":"1"},{"pos":[3,2],"answer":"4","isFix":true},{"pos":[0,3],"answer":"4"},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"2","isFix":true},{"pos":[3,3],"answer":"3"}]}',
  ),
};

export const blockSize_2_3: BlockSize = {
  height: 2,
  width: 3,
};
export const puzzle_2_3: MyGame = markFixed({
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"2"},{"pos":[2,0]},{"pos":[3,0],"answer":"4"},{"pos":[4,0],"answer":"3"},{"pos":[5,0],"answer":"5"},{"pos":[0,1],"answer":"4"},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1]},{"pos":[5,1],"answer":"1"},{"pos":[0,2],"answer":"3"},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2],"answer":"2"},{"pos":[4,2]},{"pos":[5,2]},{"pos":[0,3]},{"pos":[1,3],"answer":"1"},{"pos":[2,3],"answer":"6"},{"pos":[3,3]},{"pos":[4,3]},{"pos":[5,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4],"answer":"2"},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4],"answer":"4"},{"pos":[0,5]},{"pos":[1,5],"answer":"6"},{"pos":[2,5],"answer":"4"},{"pos":[3,5]},{"pos":[4,5],"answer":"5"},{"pos":[5,5]}]}',
  ),
});
export const solved_2_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"6"},{"pos":[1,0],"answer":"2","isFix":true},{"pos":[2,0],"answer":"1"},{"pos":[3,0],"answer":"4","isFix":true},{"pos":[4,0],"answer":"3","isFix":true},{"pos":[5,0],"answer":"5","isFix":true},{"pos":[0,1],"answer":"4","isFix":true},{"pos":[1,1],"answer":"5"},{"pos":[2,1],"answer":"3"},{"pos":[3,1],"answer":"6"},{"pos":[4,1],"answer":"2"},{"pos":[5,1],"answer":"1","isFix":true},{"pos":[0,2],"answer":"3","isFix":true},{"pos":[1,2],"answer":"4"},{"pos":[2,2],"answer":"5"},{"pos":[3,2],"answer":"2","isFix":true},{"pos":[4,2],"answer":"1"},{"pos":[5,2],"answer":"6"},{"pos":[0,3],"answer":"2"},{"pos":[1,3],"answer":"1","isFix":true},{"pos":[2,3],"answer":"6","isFix":true},{"pos":[3,3],"answer":"5"},{"pos":[4,3],"answer":"4"},{"pos":[5,3],"answer":"3"},{"pos":[0,4],"answer":"5"},{"pos":[1,4],"answer":"3"},{"pos":[2,4],"answer":"2","isFix":true},{"pos":[3,4],"answer":"1"},{"pos":[4,4],"answer":"6"},{"pos":[5,4],"answer":"4","isFix":true},{"pos":[0,5],"answer":"1"},{"pos":[1,5],"answer":"6","isFix":true},{"pos":[2,5],"answer":"4","isFix":true},{"pos":[3,5],"answer":"3"},{"pos":[4,5],"answer":"5","isFix":true},{"pos":[5,5],"answer":"2"}]}',
  ),
};

export const blockSize_3_3: BlockSize = { height: 3, width: 3 };
/**
 * 9x9の問題
 *
 * こだわりのポイント
 *
 * - 1つも答えが記入されていない番号がある
 * - 1つだけ答えが記入されている番号がある
 */
export const puzzle_3_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0]},{"pos":[1,0],"answer":"9","isFix":true},{"pos":[2,0],"answer":"7","isFix":true},{"pos":[3,0],"answer":"2","isFix":true},{"pos":[4,0]},{"pos":[5,0]},{"pos":[6,0]},{"pos":[7,0],"answer":"6","isFix":true},{"pos":[8,0]},{"pos":[0,1],"answer":"6","isFix":true},{"pos":[1,1]},{"pos":[2,1]},{"pos":[3,1]},{"pos":[4,1],"answer":"4","isFix":true},{"pos":[5,1],"answer":"8","isFix":true},{"pos":[6,1]},{"pos":[7,1]},{"pos":[8,1]},{"pos":[0,2]},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2]},{"pos":[4,2],"answer":"7","isFix":true},{"pos":[5,2],"answer":"3","isFix":true},{"pos":[6,2]},{"pos":[7,2]},{"pos":[8,2]},{"pos":[0,3]},{"pos":[1,3]},{"pos":[2,3],"answer":"9","isFix":true},{"pos":[3,3],"answer":"4","isFix":true},{"pos":[4,3]},{"pos":[5,3]},{"pos":[6,3]},{"pos":[7,3]},{"pos":[8,3]},{"pos":[0,4]},{"pos":[1,4]},{"pos":[2,4]},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4]},{"pos":[6,4],"answer":"3","isFix":true},{"pos":[7,4],"answer":"2","isFix":true},{"pos":[8,4]},{"pos":[0,5]},{"pos":[1,5]},{"pos":[2,5],"answer":"3","isFix":true},{"pos":[3,5]},{"pos":[4,5]},{"pos":[5,5],"answer":"7","isFix":true},{"pos":[6,5]},{"pos":[7,5]},{"pos":[8,5],"answer":"6","isFix":true},{"pos":[0,6]},{"pos":[1,6],"answer":"4","isFix":true},{"pos":[2,6]},{"pos":[3,6]},{"pos":[4,6]},{"pos":[5,6],"answer":"6","isFix":true},{"pos":[6,6],"answer":"1","isFix":true},{"pos":[7,6],"answer":"9","isFix":true},{"pos":[8,6]},{"pos":[0,7]},{"pos":[1,7]},{"pos":[2,7]},{"pos":[3,7]},{"pos":[4,7]},{"pos":[5,7]},{"pos":[6,7],"answer":"4","isFix":true},{"pos":[7,7]},{"pos":[8,7],"answer":"7","isFix":true},{"pos":[0,8]},{"pos":[1,8]},{"pos":[2,8]},{"pos":[3,8],"answer":"3","isFix":true},{"pos":[4,8],"answer":"2","isFix":true},{"pos":[5,8]},{"pos":[6,8]},{"pos":[7,8]},{"pos":[8,8]}]}',
  ),
};
export const solved_3_3: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"4"},{"pos":[1,0],"answer":"9"},{"pos":[2,0],"answer":"7"},{"pos":[3,0],"answer":"2"},{"pos":[4,0],"answer":"1"},{"pos":[5,0],"answer":"5"},{"pos":[6,0],"answer":"8"},{"pos":[7,0],"answer":"6"},{"pos":[8,0],"answer":"3"},{"pos":[0,1],"answer":"6"},{"pos":[1,1],"answer":"3"},{"pos":[2,1],"answer":"5"},{"pos":[3,1],"answer":"9"},{"pos":[4,1],"answer":"4"},{"pos":[5,1],"answer":"8"},{"pos":[6,1],"answer":"2"},{"pos":[7,1],"answer":"7"},{"pos":[8,1],"answer":"1"},{"pos":[0,2],"answer":"8"},{"pos":[1,2],"answer":"1"},{"pos":[2,2],"answer":"2"},{"pos":[3,2],"answer":"6"},{"pos":[4,2],"answer":"7"},{"pos":[5,2],"answer":"3"},{"pos":[6,2],"answer":"9"},{"pos":[7,2],"answer":"5"},{"pos":[8,2],"answer":"4"},{"pos":[0,3],"answer":"5"},{"pos":[1,3],"answer":"6"},{"pos":[2,3],"answer":"9"},{"pos":[3,3],"answer":"4"},{"pos":[4,3],"answer":"3"},{"pos":[5,3],"answer":"2"},{"pos":[6,3],"answer":"7"},{"pos":[7,3],"answer":"1"},{"pos":[8,3],"answer":"8"},{"pos":[0,4],"answer":"7"},{"pos":[1,4],"answer":"8"},{"pos":[2,4],"answer":"4"},{"pos":[3,4],"answer":"5"},{"pos":[4,4],"answer":"6"},{"pos":[5,4],"answer":"1"},{"pos":[6,4],"answer":"3"},{"pos":[7,4],"answer":"2"},{"pos":[8,4],"answer":"9"},{"pos":[0,5],"answer":"1"},{"pos":[1,5],"answer":"2"},{"pos":[2,5],"answer":"3"},{"pos":[3,5],"answer":"8"},{"pos":[4,5],"answer":"9"},{"pos":[5,5],"answer":"7"},{"pos":[6,5],"answer":"5"},{"pos":[7,5],"answer":"4"},{"pos":[8,5],"answer":"6"},{"pos":[0,6],"answer":"3"},{"pos":[1,6],"answer":"4"},{"pos":[2,6],"answer":"8"},{"pos":[3,6],"answer":"7"},{"pos":[4,6],"answer":"5"},{"pos":[5,6],"answer":"6"},{"pos":[6,6],"answer":"1"},{"pos":[7,6],"answer":"9"},{"pos":[8,6],"answer":"2"},{"pos":[0,7],"answer":"2"},{"pos":[1,7],"answer":"5"},{"pos":[2,7],"answer":"6"},{"pos":[3,7],"answer":"1"},{"pos":[4,7],"answer":"8"},{"pos":[5,7],"answer":"9"},{"pos":[6,7],"answer":"4"},{"pos":[7,7],"answer":"3"},{"pos":[8,7],"answer":"7"},{"pos":[0,8],"answer":"9"},{"pos":[1,8],"answer":"7"},{"pos":[2,8],"answer":"1"},{"pos":[3,8],"answer":"3"},{"pos":[4,8],"answer":"2"},{"pos":[5,8],"answer":"4"},{"pos":[6,8],"answer":"6"},{"pos":[7,8],"answer":"8"},{"pos":[8,8],"answer":"5"}]}',
  ),
};

export const puzzle_4_4: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"7"},{"pos":[1,0],"answer":"16"},{"pos":[2,0],"answer":"13"},{"pos":[3,0]},{"pos":[4,0],"answer":"14"},{"pos":[5,0]},{"pos":[6,0]},{"pos":[7,0]},{"pos":[8,0]},{"pos":[9,0]},{"pos":[10,0]},{"pos":[11,0],"answer":"4"},{"pos":[12,0],"answer":"5"},{"pos":[13,0],"answer":"2"},{"pos":[14,0]},{"pos":[15,0]},{"pos":[0,1]},{"pos":[1,1],"answer":"8"},{"pos":[2,1]},{"pos":[3,1],"answer":"12"},{"pos":[4,1]},{"pos":[5,1],"answer":"9"},{"pos":[6,1],"answer":"7"},{"pos":[7,1],"answer":"2"},{"pos":[8,1]},{"pos":[9,1]},{"pos":[10,1],"answer":"13"},{"pos":[11,1]},{"pos":[12,1]},{"pos":[13,1]},{"pos":[14,1],"answer":"3"},{"pos":[15,1]},{"pos":[0,2]},{"pos":[1,2]},{"pos":[2,2]},{"pos":[3,2]},{"pos":[4,2]},{"pos":[5,2]},{"pos":[6,2]},{"pos":[7,2]},{"pos":[8,2]},{"pos":[9,2],"answer":"5"},{"pos":[10,2]},{"pos":[11,2]},{"pos":[12,2]},{"pos":[13,2]},{"pos":[14,2]},{"pos":[15,2]},{"pos":[0,3],"answer":"9"},{"pos":[1,3]},{"pos":[2,3]},{"pos":[3,3],"answer":"6"},{"pos":[4,3]},{"pos":[5,3]},{"pos":[6,3],"answer":"3"},{"pos":[7,3]},{"pos":[8,3]},{"pos":[9,3]},{"pos":[10,3]},{"pos":[11,3]},{"pos":[12,3]},{"pos":[13,3],"answer":"1"},{"pos":[14,3],"answer":"11"},{"pos":[15,3]},{"pos":[0,4],"answer":"2"},{"pos":[1,4]},{"pos":[2,4]},{"pos":[3,4]},{"pos":[4,4]},{"pos":[5,4]},{"pos":[6,4]},{"pos":[7,4]},{"pos":[8,4]},{"pos":[9,4]},{"pos":[10,4]},{"pos":[11,4],"answer":"5"},{"pos":[12,4]},{"pos":[13,4]},{"pos":[14,4]},{"pos":[15,4],"answer":"10"},{"pos":[0,5]},{"pos":[1,5]},{"pos":[2,5],"answer":"1"},{"pos":[3,5],"answer":"7"},{"pos":[4,5],"answer":"3"},{"pos":[5,5]},{"pos":[6,5]},{"pos":[7,5],"answer":"8"},{"pos":[8,5]},{"pos":[9,5]},{"pos":[10,5],"answer":"6"},{"pos":[11,5]},{"pos":[12,5],"answer":"9"},{"pos":[13,5],"answer":"14"},{"pos":[14,5]},{"pos":[15,5]},{"pos":[0,6]},{"pos":[1,6]},{"pos":[2,6]},{"pos":[3,6],"answer":"3"},{"pos":[4,6]},{"pos":[5,6],"answer":"14"},{"pos":[6,6],"answer":"15"},{"pos":[7,6]},{"pos":[8,6]},{"pos":[9,6],"answer":"10"},{"pos":[10,6],"answer":"16"},{"pos":[11,6]},{"pos":[12,6]},{"pos":[13,6],"answer":"8"},{"pos":[14,6]},{"pos":[15,6],"answer":"4"},{"pos":[0,7]},{"pos":[1,7]},{"pos":[2,7],"answer":"10"},{"pos":[3,7],"answer":"8"},{"pos":[4,7],"answer":"7"},{"pos":[5,7]},{"pos":[6,7]},{"pos":[7,7],"answer":"9"},{"pos":[8,7]},{"pos":[9,7],"answer":"1"},{"pos":[10,7]},{"pos":[11,7]},{"pos":[12,7]},{"pos":[13,7]},{"pos":[14,7]},{"pos":[15,7]},{"pos":[0,8],"answer":"15"},{"pos":[1,8]},{"pos":[2,8]},{"pos":[3,8]},{"pos":[4,8],"answer":"5"},{"pos":[5,8]},{"pos":[6,8]},{"pos":[7,8]},{"pos":[8,8]},{"pos":[9,8]},{"pos":[10,8],"answer":"8"},{"pos":[11,8]},{"pos":[12,8]},{"pos":[13,8]},{"pos":[14,8],"answer":"4"},{"pos":[15,8]},{"pos":[0,9]},{"pos":[1,9]},{"pos":[2,9]},{"pos":[3,9],"answer":"2"},{"pos":[4,9],"answer":"13"},{"pos":[5,9]},{"pos":[6,9]},{"pos":[7,9]},{"pos":[8,9]},{"pos":[9,9]},{"pos":[10,9]},{"pos":[11,9]},{"pos":[12,9],"answer":"8"},{"pos":[13,9],"answer":"9"},{"pos":[14,9]},{"pos":[15,9],"answer":"14"},{"pos":[0,10],"answer":"11"},{"pos":[1,10],"answer":"10"},{"pos":[2,10]},{"pos":[3,10]},{"pos":[4,10]},{"pos":[5,10],"answer":"2"},{"pos":[6,10]},{"pos":[7,10]},{"pos":[8,10]},{"pos":[9,10]},{"pos":[10,10],"answer":"5"},{"pos":[11,10]},{"pos":[12,10],"answer":"3"},{"pos":[13,10]},{"pos":[14,10],"answer":"15"},{"pos":[15,10],"answer":"6"},{"pos":[0,11],"answer":"3"},{"pos":[1,11],"answer":"12"},{"pos":[2,11],"answer":"8"},{"pos":[3,11]},{"pos":[4,11]},{"pos":[5,11]},{"pos":[6,11],"answer":"4"},{"pos":[7,11]},{"pos":[8,11],"answer":"11"},{"pos":[9,11]},{"pos":[10,11],"answer":"7"},{"pos":[11,11]},{"pos":[12,11]},{"pos":[13,11]},{"pos":[14,11],"answer":"13"},{"pos":[15,11],"answer":"1"},{"pos":[0,12]},{"pos":[1,12]},{"pos":[2,12]},{"pos":[3,12]},{"pos":[4,12]},{"pos":[5,12]},{"pos":[6,12],"answer":"2"},{"pos":[7,12],"answer":"12"},{"pos":[8,12]},{"pos":[9,12]},{"pos":[10,12]},{"pos":[11,12]},{"pos":[12,12]},{"pos":[13,12],"answer":"16"},{"pos":[14,12]},{"pos":[15,12],"answer":"13"},{"pos":[0,13]},{"pos":[1,13]},{"pos":[2,13]},{"pos":[3,13]},{"pos":[4,13]},{"pos":[5,13]},{"pos":[6,13]},{"pos":[7,13],"answer":"10"},{"pos":[8,13]},{"pos":[9,13],"answer":"3"},{"pos":[10,13]},{"pos":[11,13]},{"pos":[12,13],"answer":"1"},{"pos":[13,13],"answer":"12"},{"pos":[14,13]},{"pos":[15,13]},{"pos":[0,14]},{"pos":[1,14]},{"pos":[2,14],"answer":"11"},{"pos":[3,14]},{"pos":[4,14]},{"pos":[5,14]},{"pos":[6,14]},{"pos":[7,14],"answer":"4"},{"pos":[8,14]},{"pos":[9,14]},{"pos":[10,14],"answer":"14"},{"pos":[11,14]},{"pos":[12,14]},{"pos":[13,14]},{"pos":[14,14]},{"pos":[15,14],"answer":"2"},{"pos":[0,15],"answer":"1"},{"pos":[1,15],"answer":"13"},{"pos":[2,15],"answer":"2"},{"pos":[3,15],"answer":"9"},{"pos":[4,15],"answer":"8"},{"pos":[5,15]},{"pos":[6,15]},{"pos":[7,15],"answer":"6"},{"pos":[8,15],"answer":"10"},{"pos":[9,15],"answer":"12"},{"pos":[10,15],"answer":"15"},{"pos":[11,15]},{"pos":[12,15]},{"pos":[13,15]},{"pos":[14,15]},{"pos":[15,15]}]}',
  ),
};
export const solved_4_4: MyGame = {
  ...JSON.parse(
    '{"cells":[{"pos":[0,0],"answer":"7"},{"pos":[1,0],"answer":"16"},{"pos":[2,0],"answer":"13"},{"pos":[3,0],"answer":"10"},{"pos":[4,0],"answer":"14"},{"pos":[5,0],"answer":"11"},{"pos":[6,0],"answer":"1"},{"pos":[7,0],"answer":"15"},{"pos":[8,0],"answer":"3"},{"pos":[9,0],"answer":"9"},{"pos":[10,0],"answer":"12"},{"pos":[11,0],"answer":"4"},{"pos":[12,0],"answer":"5"},{"pos":[13,0],"answer":"2"},{"pos":[14,0],"answer":"6"},{"pos":[15,0],"answer":"8"},{"pos":[0,1],"answer":"14"},{"pos":[1,1],"answer":"8"},{"pos":[2,1],"answer":"5"},{"pos":[3,1],"answer":"12"},{"pos":[4,1],"answer":"6"},{"pos":[5,1],"answer":"9"},{"pos":[6,1],"answer":"7"},{"pos":[7,1],"answer":"2"},{"pos":[8,1],"answer":"15"},{"pos":[9,1],"answer":"11"},{"pos":[10,1],"answer":"13"},{"pos":[11,1],"answer":"1"},{"pos":[12,1],"answer":"4"},{"pos":[13,1],"answer":"10"},{"pos":[14,1],"answer":"3"},{"pos":[15,1],"answer":"16"},{"pos":[0,2],"answer":"4"},{"pos":[1,2],"answer":"1"},{"pos":[2,2],"answer":"3"},{"pos":[3,2],"answer":"11"},{"pos":[4,2],"answer":"10"},{"pos":[5,2],"answer":"8"},{"pos":[6,2],"answer":"12"},{"pos":[7,2],"answer":"16"},{"pos":[8,2],"answer":"6"},{"pos":[9,2],"answer":"5"},{"pos":[10,2],"answer":"2"},{"pos":[11,2],"answer":"7"},{"pos":[12,2],"answer":"15"},{"pos":[13,2],"answer":"13"},{"pos":[14,2],"answer":"14"},{"pos":[15,2],"answer":"9"},{"pos":[0,3],"answer":"9"},{"pos":[1,3],"answer":"2"},{"pos":[2,3],"answer":"15"},{"pos":[3,3],"answer":"6"},{"pos":[4,3],"answer":"4"},{"pos":[5,3],"answer":"5"},{"pos":[6,3],"answer":"3"},{"pos":[7,3],"answer":"13"},{"pos":[8,3],"answer":"8"},{"pos":[9,3],"answer":"16"},{"pos":[10,3],"answer":"10"},{"pos":[11,3],"answer":"14"},{"pos":[12,3],"answer":"12"},{"pos":[13,3],"answer":"1"},{"pos":[14,3],"answer":"11"},{"pos":[15,3],"answer":"7"},{"pos":[0,4],"answer":"2"},{"pos":[1,4],"answer":"4"},{"pos":[2,4],"answer":"14"},{"pos":[3,4],"answer":"15"},{"pos":[4,4],"answer":"1"},{"pos":[5,4],"answer":"12"},{"pos":[6,4],"answer":"13"},{"pos":[7,4],"answer":"11"},{"pos":[8,4],"answer":"9"},{"pos":[9,4],"answer":"8"},{"pos":[10,4],"answer":"3"},{"pos":[11,4],"answer":"5"},{"pos":[12,4],"answer":"16"},{"pos":[13,4],"answer":"6"},{"pos":[14,4],"answer":"7"},{"pos":[15,4],"answer":"10"},{"pos":[0,5],"answer":"13"},{"pos":[1,5],"answer":"11"},{"pos":[2,5],"answer":"1"},{"pos":[3,5],"answer":"7"},{"pos":[4,5],"answer":"3"},{"pos":[5,5],"answer":"16"},{"pos":[6,5],"answer":"10"},{"pos":[7,5],"answer":"8"},{"pos":[8,5],"answer":"4"},{"pos":[9,5],"answer":"2"},{"pos":[10,5],"answer":"6"},{"pos":[11,5],"answer":"15"},{"pos":[12,5],"answer":"9"},{"pos":[13,5],"answer":"14"},{"pos":[14,5],"answer":"12"},{"pos":[15,5],"answer":"5"},{"pos":[0,6],"answer":"6"},{"pos":[1,6],"answer":"9"},{"pos":[2,6],"answer":"12"},{"pos":[3,6],"answer":"3"},{"pos":[4,6],"answer":"2"},{"pos":[5,6],"answer":"14"},{"pos":[6,6],"answer":"15"},{"pos":[7,6],"answer":"5"},{"pos":[8,6],"answer":"7"},{"pos":[9,6],"answer":"10"},{"pos":[10,6],"answer":"16"},{"pos":[11,6],"answer":"13"},{"pos":[12,6],"answer":"11"},{"pos":[13,6],"answer":"8"},{"pos":[14,6],"answer":"1"},{"pos":[15,6],"answer":"4"},{"pos":[0,7],"answer":"16"},{"pos":[1,7],"answer":"5"},{"pos":[2,7],"answer":"10"},{"pos":[3,7],"answer":"8"},{"pos":[4,7],"answer":"7"},{"pos":[5,7],"answer":"4"},{"pos":[6,7],"answer":"6"},{"pos":[7,7],"answer":"9"},{"pos":[8,7],"answer":"14"},{"pos":[9,7],"answer":"1"},{"pos":[10,7],"answer":"11"},{"pos":[11,7],"answer":"12"},{"pos":[12,7],"answer":"13"},{"pos":[13,7],"answer":"15"},{"pos":[14,7],"answer":"2"},{"pos":[15,7],"answer":"3"},{"pos":[0,8],"answer":"15"},{"pos":[1,8],"answer":"14"},{"pos":[2,8],"answer":"9"},{"pos":[3,8],"answer":"1"},{"pos":[4,8],"answer":"5"},{"pos":[5,8],"answer":"10"},{"pos":[6,8],"answer":"16"},{"pos":[7,8],"answer":"7"},{"pos":[8,8],"answer":"13"},{"pos":[9,8],"answer":"6"},{"pos":[10,8],"answer":"8"},{"pos":[11,8],"answer":"3"},{"pos":[12,8],"answer":"2"},{"pos":[13,8],"answer":"11"},{"pos":[14,8],"answer":"4"},{"pos":[15,8],"answer":"12"},{"pos":[0,9],"answer":"5"},{"pos":[1,9],"answer":"6"},{"pos":[2,9],"answer":"7"},{"pos":[3,9],"answer":"2"},{"pos":[4,9],"answer":"13"},{"pos":[5,9],"answer":"15"},{"pos":[6,9],"answer":"11"},{"pos":[7,9],"answer":"3"},{"pos":[8,9],"answer":"12"},{"pos":[9,9],"answer":"4"},{"pos":[10,9],"answer":"1"},{"pos":[11,9],"answer":"10"},{"pos":[12,9],"answer":"8"},{"pos":[13,9],"answer":"9"},{"pos":[14,9],"answer":"16"},{"pos":[15,9],"answer":"14"},{"pos":[0,10],"answer":"11"},{"pos":[1,10],"answer":"10"},{"pos":[2,10],"answer":"4"},{"pos":[3,10],"answer":"13"},{"pos":[4,10],"answer":"12"},{"pos":[5,10],"answer":"2"},{"pos":[6,10],"answer":"8"},{"pos":[7,10],"answer":"1"},{"pos":[8,10],"answer":"16"},{"pos":[9,10],"answer":"14"},{"pos":[10,10],"answer":"5"},{"pos":[11,10],"answer":"9"},{"pos":[12,10],"answer":"3"},{"pos":[13,10],"answer":"7"},{"pos":[14,10],"answer":"15"},{"pos":[15,10],"answer":"6"},{"pos":[0,11],"answer":"3"},{"pos":[1,11],"answer":"12"},{"pos":[2,11],"answer":"8"},{"pos":[3,11],"answer":"16"},{"pos":[4,11],"answer":"9"},{"pos":[5,11],"answer":"6"},{"pos":[6,11],"answer":"4"},{"pos":[7,11],"answer":"14"},{"pos":[8,11],"answer":"11"},{"pos":[9,11],"answer":"15"},{"pos":[10,11],"answer":"7"},{"pos":[11,11],"answer":"2"},{"pos":[12,11],"answer":"10"},{"pos":[13,11],"answer":"5"},{"pos":[14,11],"answer":"13"},{"pos":[15,11],"answer":"1"},{"pos":[0,12],"answer":"10"},{"pos":[1,12],"answer":"3"},{"pos":[2,12],"answer":"6"},{"pos":[3,12],"answer":"4"},{"pos":[4,12],"answer":"15"},{"pos":[5,12],"answer":"1"},{"pos":[6,12],"answer":"2"},{"pos":[7,12],"answer":"12"},{"pos":[8,12],"answer":"5"},{"pos":[9,12],"answer":"7"},{"pos":[10,12],"answer":"9"},{"pos":[11,12],"answer":"11"},{"pos":[12,12],"answer":"14"},{"pos":[13,12],"answer":"16"},{"pos":[14,12],"answer":"8"},{"pos":[15,12],"answer":"13"},{"pos":[0,13],"answer":"8"},{"pos":[1,13],"answer":"7"},{"pos":[2,13],"answer":"16"},{"pos":[3,13],"answer":"14"},{"pos":[4,13],"answer":"11"},{"pos":[5,13],"answer":"13"},{"pos":[6,13],"answer":"5"},{"pos":[7,13],"answer":"10"},{"pos":[8,13],"answer":"2"},{"pos":[9,13],"answer":"3"},{"pos":[10,13],"answer":"4"},{"pos":[11,13],"answer":"6"},{"pos":[12,13],"answer":"1"},{"pos":[13,13],"answer":"12"},{"pos":[14,13],"answer":"9"},{"pos":[15,13],"answer":"15"},{"pos":[0,14],"answer":"12"},{"pos":[1,14],"answer":"15"},{"pos":[2,14],"answer":"11"},{"pos":[3,14],"answer":"5"},{"pos":[4,14],"answer":"16"},{"pos":[5,14],"answer":"7"},{"pos":[6,14],"answer":"9"},{"pos":[7,14],"answer":"4"},{"pos":[8,14],"answer":"1"},{"pos":[9,14],"answer":"13"},{"pos":[10,14],"answer":"14"},{"pos":[11,14],"answer":"8"},{"pos":[12,14],"answer":"6"},{"pos":[13,14],"answer":"3"},{"pos":[14,14],"answer":"10"},{"pos":[15,14],"answer":"2"},{"pos":[0,15],"answer":"1"},{"pos":[1,15],"answer":"13"},{"pos":[2,15],"answer":"2"},{"pos":[3,15],"answer":"9"},{"pos":[4,15],"answer":"8"},{"pos":[5,15],"answer":"3"},{"pos":[6,15],"answer":"14"},{"pos":[7,15],"answer":"6"},{"pos":[8,15],"answer":"10"},{"pos":[9,15],"answer":"12"},{"pos":[10,15],"answer":"15"},{"pos":[11,15],"answer":"16"},{"pos":[12,15],"answer":"7"},{"pos":[13,15],"answer":"4"},{"pos":[14,15],"answer":"5"},{"pos":[15,15],"answer":"11"}]}',
  ),
};
