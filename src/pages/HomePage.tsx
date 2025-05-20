import { OnOffManagerWrapper, onOffMutate } from '../EventToggleManager';

const DeepNestedComponent = () => {
  return (
    <>
      <button
        onClick={() => {
          onOffMutate({
            name: 'one',
            payload: 1,
          });
        }}
      >
        click me
      </button>
    </>
  );
};

export default function HomePage() {
  return (
    <div>
      <OnOffManagerWrapper name="one">
        {({ status, payload }) => {
          console.log('one status', status, payload);
          return <>one</>;
        }}
      </OnOffManagerWrapper>
      <OnOffManagerWrapper name="two">
        {({ status }) => {
          console.log('two status', status);
          return <>two</>;
        }}
      </OnOffManagerWrapper>
      <DeepNestedComponent />
      <button
        onClick={() => {
          onOffMutate({
            name: 'two',
          });
        }}
      >
        click me two
      </button>
    </div>
  );
}
