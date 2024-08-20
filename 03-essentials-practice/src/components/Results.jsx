import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ input }) {
  const resultData = calculateInvestmentResults(input);

  const initialInvestment = resultData[0].valueEndOfYear - resultData[0].interest - resultData[0].annualInvestment;
  const totaInterest = (yearData) => yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment;
  const totaAmountInvested = (yearData) => yearData.valueEndOfYear - totaInterest(yearData);

  console.log(resultData)
  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultData.map((yearData)=> <>
          <tr key={yearData.year}>
            <td>{yearData.year}</td>
            <td>{formatter.format(yearData.valueEndOfYear)}</td>
            <td>{formatter.format(yearData.interest)}</td>
            <td>{formatter.format(totaInterest(yearData))}</td>
            <td>{formatter.format(totaAmountInvested(yearData))}</td>
          </tr>
        </>)}
      </tbody>
    </table>
  )
}