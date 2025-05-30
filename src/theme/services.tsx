import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useGlobalContext } from '../provider';

const [state] = useGlobalContext();

const w = (w: number) => wp(w + "%");
const h = (h: number) => hp(h + "%");

export { w, h };