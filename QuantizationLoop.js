
/**
 * @description 计算序列中最后一个非零值的下标，用于确定零值区的起始点。如果序列全为0，则返回-1。
 */
function LastNzeroIndex(seq) {
    for(let i = seq.length - 1; i >= 0; i--) {
        if(seq[i] === 0) continue;
        else return i;
    }
    return -1;
}

/**
 * @description 计算序列中最后一个大于等于2的值（即所谓的大值）的下标，用于确定零值区的起始点。如果序列没有大值，则返回-1。
 */
function LastBigvalueIndex(seq) {
    for(let i = seq.length - 1; i >= 0; i--) {
        if(seq[i] < 2) continue;
        else return i;
    }
    return -1;
}

