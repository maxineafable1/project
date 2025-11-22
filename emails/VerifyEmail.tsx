import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text
} from '@react-email/components';

type Props = {
  url: string
}

export default function VerifyEmail({
  url,
}: Props) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='px-4 mx-auto'>
          <Preview>Confirm your email address</Preview>
          <Container>
            <Heading className="text-black text-4xl font-bold my-8 mx-0 p-0 leading-[42px]">
              Confirm your email address
            </Heading>
            <Link
              href={url}
              className="text-blue-500 text-sm underline mb-4 block"
            >
              Click here to verify your email address
            </Link>
            <Text className="text-sm my-4">
              If you didn&apos;t request this email, you can safely ignore it :&#41;.
            </Text>
            <Text className="text-sm my-4">
              &mdash; Liftts
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}