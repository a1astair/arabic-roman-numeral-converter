import React from 'react';
import { Formik, Field, Form } from 'formik';
import Select from 'react-select'

const options = [
  { value: 'arabic', label: 'Arabic' },
  { value: 'roman', label: 'Roman' },
]

interface NumeralFormProps {
  getNumbers(): void;
}



export const NumeralForm = (props: NumeralFormProps) => {
  const [serverMessage, setServerMessage] = React.useState<string>("")

  const renderServerMessage = (str: string) => {
    if (str) {
      setServerMessage(str);
      setTimeout(() => {
        setServerMessage("")
      }, 2000)
    }
  }

  return (
    <div>
      <h2>Enter your number and pick your conversion</h2>
      <Formik
        initialValues={{
          numeral: '',
          convertTo: '',
        }}
        onSubmit={async (values) => {
          try {
            const response = await fetch("http://localhost:3001/api/convert", {
              method: 'post',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(values)
            })
            const res = await response.json();
            renderServerMessage(res?.message)
            if (res.success) {
              props.getNumbers()
            }
          } catch (err) {
            renderServerMessage("Error! Please try again")
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <label htmlFor="numeral">Numeral</label>
            <br/>
            <Field name="numeral" placeholder="123" required className="numeral-input "/>
            <br/>
            <br/>
            <label htmlFor="convertTo">Convert to?</label>
            <Select className="convert-to-dropdown" options={options} name="convertTo" onChange={(option) => setFieldValue("convertTo", option?.value)} required/>
            <br/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      {serverMessage && <div><p>{serverMessage}</p></div>}
    </div>
  )
};