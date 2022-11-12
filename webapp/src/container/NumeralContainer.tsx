import React from "react"
import { NumeralForm } from "../components/NumeralForm"
import { NumeralList } from "../components/NumeralList"
import { NumeralModel } from "../models/NumberModel"

export const NumeralContainer = () => {
    const [numerals, setNumerals] = React.useState<NumeralModel[]>([])
    const getNumbers = (): void => {
        fetch("http://localhost:3001/api/get")
            .then((response) => response.json())
            .then((response) => {
                if (response.success && response.numerals) {
                    setNumerals(response.numerals);

                }
            })
    }

    React.useEffect(() => {
        getNumbers();
    }, [])

    return (
        <>
            <NumeralForm getNumbers={() => getNumbers()} />
            <NumeralList numerals={numerals}/>
        </>
    )
}