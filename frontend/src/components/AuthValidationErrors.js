import styled from 'styled-components'
const AuthValidationErrors = ({ errors = [], ...props }) => (
    <>
        {errors.length > 0 && (
            <ErrorWrapper {...props}>
                <ul>
                    {errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            </ErrorWrapper>
        )}
    </>
)

export default AuthValidationErrors

const ErrorWrapper = styled.div`
    font-size: 1.4rem;
    color: red;
    margin-bottom: 2rem;

    ul {
        list-style: none;
    }
`
