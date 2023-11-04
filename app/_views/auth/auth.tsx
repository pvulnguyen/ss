import {SignInForm, SignUpForm, Url} from '@ui/index';
import {Container} from './container';

export function Auth({type}: {type: 'sign-in' | 'sign-up'}) {
  if (type === 'sign-up') {
    return (
      <Container type="sign-up">
        <SignUpForm />
        <Url to="/sign-in" label="Already have an account?" />
      </Container>
    );
  }

  return (
    <Container type="sign-in">
      <SignInForm />
      <Url to="/sign-up" label="Need an account?" />
    </Container>
  );
}
