import { styled } from 'styled-components';

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({$invalid}) => $invalid ? '#f87171' : '#6b7280' };
`;
// {$invalid} 解構 Label 的 props

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({$invalid}) => $invalid ? '#fed2d2' : '#d1d5db' };
  color: ${({$invalid}) => $invalid ? '#ef4444' : '#374151' };
  border: 1px solid transparent;
  border-radius: 0.25rem;
  border-color: ${({$invalid}) => $invalid ? '#f73f3f' : 'transparent' };
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

export default function CustomInput({label, invalid, ...props}) {
  return (
    <p>
        <Label $invalid={invalid}>{label}</Label>
        <Input $invalid={invalid} {...props}/>
        {/* 通过在 prop 名称前加上 `$`，styled-components 
        会识别这是一个自定义属性，并且不会将其传递给实际的 DOM 元素，
        而是仅用于样式计算。 */}
    </p>
  )
}