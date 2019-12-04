
/**
 * @description 计算序列中最后一个非零值的下标，用于确定零值区的起始点。如果序列全为0，则返回-1。
 */
function LastNzeroIndex(seq) {
    for(let i = seq.length - 1; i >= 0; i--) {
        if(Math.abs(seq[i]) === 0) continue;
        else return i;
    }
    return -1;
}

/**
 * @description 计算序列中最后一个大于等于2的值（即所谓的大值）的下标，用于确定零值区的起始点。如果序列没有大值，则返回-1。
 */
function LastBigvalueIndex(seq) {
    for(let i = seq.length - 1; i >= 0; i--) {
        if(Math.abs(seq[i]) < 2) continue;
        else return i;
    }
    return -1;
}

/**
 * @description 使用指定的小值哈夫曼表（0/1），对小值四元组进行编码
 */
function EncodeQuadruple(v, w, x, y, tableSelect) {
    let key = (Math.abs(v) << 3) + (Math.abs(w) << 2) + (Math.abs(x) << 1) + (Math.abs(y) << 0);
    let hcode = HuffmanTableQuadruple[tableSelect][key];
    return hcode;
}

/**
 * @description 使用指定的大值哈夫曼表，对大值二元组进行编码，并返回相应的linbitsX、linbitsY
 */
function EncodeDuple(x, y, tableSelect) {
    x = Math.abs(x);
    y = Math.abs(y);
    let huffmanTableObject = HuffmanTableDuple[tableSelect]; // TODO 码表存在性检查
    let linbits = huffmanTableObject.linbits;
    let linbitsX = null;
    let linbitsY = null;
    if(x >= 15) {
        linbitsX = BinaryString(x - 15, linbits);
        x = 15;
    }
    if(y >= 15) {
        linbitsY = BinaryString(y - 15, linbits);
        y = 15;
    }
    let key = `${x} ${y}`;
    let hcode = (huffmanTableObject.table)[key];

    return {
        "huffmanCode": hcode,
        "linbits": linbits,
        "linbitsX": linbitsX,
        "linbitsY": linbitsY
    };
}

/**
 * @description 返回某正整数的指定长度的二进制串
 */
function BinaryString(intNumber, length) {
    let seq = [];
    for(let i = 0; i < length; i++) {
        if((intNumber & 1) > 0) seq.unshift("1");
        else seq.unshift("0");
        intNumber = intNumber >> 1;
    }
    return seq.join("");
}

/**
 * @description 576点量化频谱分区：一般分为大值区（bigvalues）、小值区（smallvalues）和零值区（zeros）
 */
function PartitionQuantizedSpectrum(qspect) {
    // 先计算小值区和零值区的起始位置
    let smallvaluesStartIndex = LastBigvalueIndex(qspect) + 1;
    let zerosStartIndex = LastNzeroIndex(qspect) + 1;
    // 小值区起点位置向后移动，对齐到偶数（因大值是成对的）
    if((smallvaluesStartIndex & 1) > 0) {
        smallvaluesStartIndex++;
    }
    // 零值区起点向后移动，使小值区长度(zerosStartIndex - smallvaluesStartIndex)为4的倍数
    while(((zerosStartIndex - smallvaluesStartIndex) & 3) > 0) {
        zerosStartIndex++;
    }
    // 如果零值区起点超过了频谱宽度，说明零值区的长度不足2，则将小值区起点向后移动两位
    // 例如 .. 3 2|0 0 0 0 1 0 - -|
    // 应为 .. 3 2 0 0|0 0 1 0|
    if(zerosStartIndex > qspect.length) {
        smallvaluesStartIndex += 2;
        zerosStartIndex = qspect.length;
    }
    // 返回各区域的边界
    return {
        "bigvalues": [0, smallvaluesStartIndex],
        "smallvalues": [smallvaluesStartIndex, zerosStartIndex],
        "zeros": [zerosStartIndex, qspect.length]
    };
}

/**
 * @description 对量化频谱作哈夫曼编码
 */
function HuffmanEncodeQuantizedSpectrum(qspect) {
    // 对量化频谱分区
    let partition = PartitionQuantizedSpectrum(qspect);

    // 处理大值区
    // 以尺度因子频带（scalefactor bands，SFB）划分子区间（region）：按照C.1.5.4.4.6的推荐，选择大值区内的前三分之一SFB、后四分之一SFB为分割点，并保证分割点跟SFB的分割点对齐（即region划分不能跨过SFB）。（详见p27）
    // 保存分割点信息到region0_count和region1_count，具体是子区间0和1所包含的SFB数量减一。
    // 注意：对于短块部分（即非混合块模式的全部短块，以及混合块模式下高频方向的短块部分），这两个数量应相应地乘以3。详见p27。

    // 对每个子区间选取不同的Huffman编码表，保留码表编号（含linbits）到table_select，并对子区间进行编码。

    // 处理小值区
    // 分别使用0和1两个四元组Huffman码表进行编码，计算总码长，选取较小者为最终的编码，并记录对应的码表编号0或1到count1table_select。

    // 零值区无需处理

    // 按照C.1.5.3.7提供的步骤，输出符合2.4.1.7规定的Huffmancodebits二进制序列，供内圈循环计算量化频谱的Huffman码长。
    // 同时保留边信息（码表选择信息等），待外圈循环和帧循环确定 尺度因子、scfsi、量化步长、预加重标识 等信息后，输出最终的一帧编码。
}

