import { useState } from 'react';
import CardContent from './CardContent';
import { CSSTransition } from 'react-transition-group';
import './UserCard.css';
import avatarSlysnek from '/avatar1.jpg';

function UserCard() {
  const [showBack, setShowBack] = useState(false);

  return (
    <div className="flippable-card-container">
      <CSSTransition in={showBack} timeout={400} classNames="flip">
        <CardContent
          avatar={avatarSlysnek}
          name="Kirill"
          GHLink="https://github.com/slysnek"
          EMLink="sample@gmail.com"
          TGLink="@sampleAccount"
          onClick={() => {
            setShowBack((show) => !show);
          }}
        />
      </CSSTransition>
    </div>
  );
}

export default UserCard;
