import styled from 'styled-components'
const FormWrapper = props => {
    return <Wrapper>{props.children}</Wrapper>
}
export default FormWrapper

const Wrapper = styled.div`
    width: 400px;
    transform: translateX(-50%);
    border: none;
    border-radius: 1rem;
    padding: 2rem 4rem 2rem 4rem;
    //padding-right: 4rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #fff;
`
