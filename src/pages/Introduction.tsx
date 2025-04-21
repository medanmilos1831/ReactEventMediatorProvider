// import { Modal } from '../modal';

const Introduction = () => {
  return (
    <div>
      <div
        style={{
          color: 'white',
        }}
      >
        <h1>Introduction</h1>
        <p>
          Welcome to Event Pulse — a lightweight, event-driven library designed
          to make communication between your components clean, scalable, and
          decoupled. Traditional React apps often struggle with passing data
          through deeply nested structures or managing scattered UI states.
          Event Pulse solves this by introducing a simple event-based
          communication model. No need for heavy global state managers, prop
          drilling, or boilerplate setups. Just events — clean and scoped.
        </p>
        <br />
        <h2>Why Event Pulse?</h2>
        <p>
          Unlike traditional state management libraries like Redux, MobX, or
          even Context-heavy solutions, Event Pulse is based purely on an
          event-driven architecture. This allows components to listen and react
          to changes without being tightly coupled or burdened by global
          providers or massive stores.
        </p>
        <section>
          <h3>Built for:</h3>
          <ul>
            <li>Dynamic UI flows (open modals, drawers, notifications)</li>
            <li>Cross-component communication without prop drilling</li>
            <li>Highly decoupled systems with minimal overhead</li>
          </ul>
        </section>
        <br />
        <h2>When to Use Event Pulse?</h2>
        <p>
          You want to open or close modals from anywhere in the app You need to
          trigger UI updates across unrelated parts of your component tree You
          want a clean separation of concerns between components You are
          building systems that rely heavily on user interactions and need
          reactive behavior
        </p>
        <section>
          <h2>Use Event Pulse when:</h2>
          <ul>
            <li>You want to open or close modals from anywhere in the app</li>
            <li>
              You need to trigger UI updates across unrelated parts of your
              component tree
            </li>
            <li>You want a clean separation of concerns between components</li>
            <li>
              You are building systems that rely heavily on user interactions
              and need reactive behavior
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export { Introduction };
