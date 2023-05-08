import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { query, collection, getDocs, where } from 'firebase/firestore';
import { setName } from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../store/hooksRedux';

const setUserName = async () => {
  try {
    const initialdata = useAppSelector((state) => state.userAuth);
    const dispatch = useAppDispatch();
    const [user] = useAuthState(auth);
    const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    dispatch(
      setName({
        ...initialdata,
        name: data.name,
      })
    );
  } catch (err) {
    if (err instanceof Error) return { err: err.message };
    return { err: 'error by get User Name' };
  }
};

export default setUserName;
