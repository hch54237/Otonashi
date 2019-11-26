
/**
 * @description 长窗 窗函数（Type = 0）
 * @reference C.1.5.3.3(p96)
 */
function WindowNormal(i) {
    return (i >= 0 && i <= 36) ? Math.sin(Math.PI * (i + 0.5) / 36) :
           0;
}

/**
 * @description 起始窗 窗函数（Type = 1）
 * @reference C.1.5.3.3(p95)
 */
function WindowStart(i) {
    return (i >= 0  && i < 18) ? Math.sin(Math.PI * (i + 0.5) / 36) :
           (i >= 18 && i < 24) ? 1 :
           (i >= 24 && i < 30) ? Math.sin(Math.PI * (i + 0.5 - 18) / 12) :
           0;
}

/**
 * @description 短窗 窗函数（Type = 2）
 * @reference C.1.5.3.3(p96)
 */
function WindowShort(i) {
    return (i >= 0 && i <= 12) ? Math.sin(Math.PI * (i + 0.5) / 12) :
           0;
}

/**
 * @description 结束窗 窗函数（Type = 3）
 * @reference C.1.5.3.3(p96)
 */
function WindowStop(i) {
    return (i >= 0  && i < 6 ) ? 0:
           (i >= 6  && i < 12) ? Math.sin(Math.PI * (i + 0.5 - 6) / 12) :
           (i >= 12 && i < 18) ? 1 :
           (i >= 18 && i <=36) ? Math.sin(Math.PI * (i + 0.5) / 36) :
           0;
}

/**
 * @description 改进的离散余弦变换（MDCT）
 * @reference C.1.5.3.3(p96)
 * @input  input - 36或者12点时域序列
 * @input  length - 输入时域序列长度：36为长窗口；12为短窗口
 * @output 18/6个频域点
 */
function MDCT(input, length) {
    let output = new Array();
    for(let i = 0; i < (length / 2); i++) {
        let sum = 0;
        for(let k = 0; k < length; k++) {
            let temp = Math.PI * (2 * k + 1 + length / 2) * (2 * i + 1) / (2 * length);
            sum += input[k] * Math.cos(temp);
        }
        output[i] = sum;
    }
    return output;
}
