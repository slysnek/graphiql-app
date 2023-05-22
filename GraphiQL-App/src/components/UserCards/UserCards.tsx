import SimpleUserCard from '../SimpleUserCard/SimpleUserCard';

import './UserCards.css';
import avatarSlysnek from '/avatar1.jpg';
import avatarSkuzema from '/avatar2.jpg';
import avatarSergik from '/avatar3.jpg';

function UserCards() {
  return (
    <div className="authors">
      <SimpleUserCard
        EMLink="sample@gmail.com"
        GHLink="https://github.com/slysnek"
        TGLink="@sampleAccount"
        avatar={avatarSlysnek}
        author="1"
        name="Kirill"
        positionAvatar="right"
        positionContent="left"
      />
      <SimpleUserCard
        EMLink="sample@gmail.com"
        GHLink="https://github.com/skuzema"
        TGLink="@sampleAccount"
        avatar={avatarSkuzema}
        author="2"
        name="Sergei"
        positionAvatar="left"
        positionContent="right"
      />
      <SimpleUserCard
        EMLink="sample@gmail.com"
        GHLink="https://github.com/SergikEnergy"
        TGLink="@sampleAccount"
        avatar={avatarSergik}
        author="3"
        name="Sergei"
        positionAvatar="right"
        positionContent="left"
      />
    </div>
  );
}

export default UserCards;
