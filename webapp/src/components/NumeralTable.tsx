import React from 'react';
import { NumeralModel } from '../models/NumberModel'


interface NumeralsObject {
    numerals: NumeralModel[]
}

export const NumeralTable = (numeralsObject: NumeralsObject) => {
    return (
        <div>
            {numeralsObject.numerals.length > 0 &&
            <><h3>Previous Numeral Entries</h3><div>
                        <table className="numeral-table">
                            <thead>
                                <tr>
                                    <th>Created At</th>
                                    <th>Arabic Numeral</th>
                                    <th>Roman Numeral</th>
                                </tr>
                            </thead>
                            <tbody>
                                {numeralsObject.numerals.map((n: NumeralModel, key) => <tr key={key}>
                                    <td>{new Date(n.createdAt).toLocaleString()}</td>
                                    <td>{n.arabicNumeral}</td>
                                    <td>{n.romanNumeral}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div></>}
            {numeralsObject.numerals.length === 0 &&
            <p>No Numerals in database</p>}
        </div>
       
    )
};