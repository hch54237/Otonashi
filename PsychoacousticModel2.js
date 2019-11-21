
// 第二心理声学模型 试验性实现


// 前两个长块的极坐标频谱（0~1023）
let PrevLongPolarSpectrum1, PrevLongPolarSpectrum2;
// 前两个短块的极坐标频谱（0~255）
let PrevShortPolarSpectrum1, PrevShortPolarSpectrum2;


// 计算长块/短块极坐标频谱：加窗并执行1024/256点FFT Subclause D.2.4 step b) @ p.129
// 输入：Subclause D.2.4 step a) @ p.129 规定的1024/256点PCM序列，以576/192采样为中心
// 输出：[r[w], f[w]], w=0~1023/255
function CalculatePolarSpectrum(input, isLongBlock) {
    let BlockLength = (isLongBlock) ? 1024 : 256;
    // 加1024/256点Hann窗
    let windowedInput = new Array();
    for(let i = 0; i < BlockLength; i++) {
        windowedInput[i] = input[i] * (0.5 - 0.5 * Math.cos(2 * Math.PI * (i - 0.5) / BlockLength));
    }
    // 执行FFT
    let spectrum = FFT(RealArrayToComplexArray(windowedInput), BlockLength);
    // 转换成极坐标表示
    let polarSpectrum = ComplexArrayToPolarArrays(spectrum);
    return polarSpectrum;
}


// 计算长块/短块的预测极坐标频谱 Subclause D.2.4 step c) @ p.129
// 输入：当前长块/短块的极坐标频谱 [r[w], f[w]], w=0~1023/255
// 输出：预测的长块/短块极坐标频谱 [r[w], f[w]], w=0~1023/255
// 外部变量：前两个长块/短块的极坐标频谱
function CalculatePredictedPolarSpectrum(polarSpectrum, isLongBlock) {
    let predictedPolarSpectrum_Radius = new Array();
    let predictedPolarSpectrum_Phase = new Array();
    // 长块
    if(isLongBlock) {
        for(let w = 0; w < 1024; w++) {
            predictedPolarSpectrum_Radius[w] = 2 * PrevLongPolarSpectrum1[0][w] - PrevLongPolarSpectrum2[0][w];
            predictedPolarSpectrum_Phase[w]  = 2 * PrevLongPolarSpectrum1[1][w] - PrevLongPolarSpectrum2[1][w];
        }
    }
    // 短块
    else {
        for(let w = 0; w < 256; w++) {
            predictedPolarSpectrum_Radius[w] = 2 * PrevShortPolarSpectrum1[0][w] - PrevShortPolarSpectrum2[0][w];
            predictedPolarSpectrum_Phase[w]  = 2 * PrevShortPolarSpectrum1[1][w] - PrevShortPolarSpectrum2[1][w];
        }
    }
    return [predictedPolarSpectrum_Radius, predictedPolarSpectrum_Phase];
}

// 输入：PCM缓冲区、Granule起始offset
// 输出：PE、SMR[sb]
// 外部变量：前面两个长块的极坐标频谱、前面两个短块的极坐标频谱、前一个块的类型
class PsychoacousticModel2 {
    constructor() {

    }

}
