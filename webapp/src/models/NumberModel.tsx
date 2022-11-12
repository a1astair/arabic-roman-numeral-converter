export interface NumeralModel {
    _id: string,
    _v: number,
    createdAt: string
    arabicNumeral: string,
    romanNumeral: string
}

export interface NumeralPayload {
    numeral: string,
    convertTo: string,
}

export interface NumeralResponse {
    success: Boolean,
    message: string,
    answer?: string
}