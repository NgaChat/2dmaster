// adsService.js
import { RewardedAd, RewardedAdEventType, InterstitialAd, AdEventType, AppOpenAd } from 'react-native-google-mobile-ads';

// Replace with your actual ad unit ID
const AD_UNIT_ID = 'ca-app-pub-9279048532768395/8092786709';

const rewardedAd = RewardedAd.createForAdRequest(AD_UNIT_ID);

const loadRewardedAd = () => {
  rewardedAd.load();
  console.log('Rewarded ad is loading');
};

const showRewardedAd = () => {
  rewardedAd.show();
};

// Set up event listeners
rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
  console.log('Rewarded ad loaded');
  
});
rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, () => {
  console.log('Rewarded ad clicked');
  
});


// rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
//   console.log('User earned reward:', reward);
// });

// rewardedAd.addAdEventListener(RewardedAdEventType.CLOSED, () => {
//   console.log('Rewarded ad closed');
// });



const InterAdUnit = 'ca-app-pub-9279048532768395/1973165135'
const interAd = InterstitialAd.createForAdRequest(InterAdUnit);

const loadInterAds = () => {
  interAd.load();
  console.log('Inter ad is loading');
};
const showInterAd = () => {
  interAd.show();
};

interAd.addAdEventListener(AdEventType.LOADED, () => {
  console.log('Inter ad loaded');
});



const appOpenAd = AppOpenAd.createForAdRequest('ca-app-pub-9279048532768395/4760046354')
const loadOpenAd = () => {
  appOpenAd.load();
}
const showOpenAd = () => {
  appOpenAd.show();
}
let status = false
appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
  appOpenAd.show();
})
// Export functions
export { loadRewardedAd, showRewardedAd, loadInterAds, showInterAd, loadOpenAd, showOpenAd, status };
