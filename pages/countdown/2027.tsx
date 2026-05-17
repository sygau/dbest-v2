export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/countdown',
      permanent: true,
    },
  };
}

export default function Countdown2027Page() {
  return null;
}
