import * as _ from 'lodash';
import common from './_common.json';
import profile from './_profile.json';

const entries = [common, profile];
const en = {};
_.forEach(entries, function (lang) {
  Object.assign(en, lang);
});

export default en;
