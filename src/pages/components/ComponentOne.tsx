import { overlayManager } from '../../overlayManager/OverlayManager';

export const ComponentOne = () => {
  return (
    <div>
      ComponentOne
      <button
        onClick={() => {
          overlayManager('modal').on('modalOne');
        }}
      >
        Open modal one
      </button>
      <br />
      <button
        onClick={() => {
          overlayManager('drawer').on('drawerOne', {
            id: 'neki id',
          });
        }}
      >
        open drawer one
      </button>
    </div>
  );
};
