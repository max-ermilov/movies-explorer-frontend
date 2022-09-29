// параметры пагинации отличаются от общего брифа, но соответствуют персональному макету

export const getFirstRows = width => {
  if (width >= 1280) {
    return 16; // number of cards
  }
  if (width >= 947) {
    return 12;
  }
  if (width >= 618) {
    return 8;
  }
  return 5;
};

export const getLoadStep = width => {
  if (width >= 1280) {
    return 4; // number of cards
  }
  if (width >= 947) {
    return 3;
  }
  return 2;
}
