import { colors } from '@theme/colors';
import * as React from 'react';
import { Path, Svg } from 'react-native-svg';

interface IProps {
  color?: string;
}

export default function Immune({ color = colors.darkblue }: IProps) {
  return (
    <Svg fill="none" height="38" viewBox="0 0 37 38" width="37">
      <Path
        d="M11.1456 15.028C11.0345 15.0276 10.9246 15.0051 10.8223 14.9618C10.72 14.9186 10.6272 14.8555 10.5495 14.7762L0.74351 4.81069C0.666333 4.73186 0.60544 4.6386 0.564305 4.53624C0.523171 4.43387 0.502601 4.32441 0.50377 4.2141C0.50494 4.10378 0.527826 3.99478 0.571121 3.89331C0.614416 3.79184 0.677273 3.6999 0.756103 3.62272C0.834933 3.54555 0.928192 3.48465 1.03056 3.44352C1.13292 3.40238 1.24238 3.38181 1.35269 3.38298C1.46301 3.38415 1.57201 3.40704 1.67348 3.45033C1.77495 3.49363 1.86689 3.55648 1.94407 3.63531L11.7836 13.6092C11.94 13.7665 12.0278 13.9793 12.0278 14.2011C12.0278 14.4229 11.94 14.6357 11.7836 14.793C11.6995 14.8745 11.5993 14.9375 11.4895 14.978C11.3796 15.0185 11.2624 15.0355 11.1456 15.028Z"
        fill={color}
      />
      <Path
        d="M25.8462 15.028C25.6259 15.0271 25.4149 14.9397 25.2585 14.7846C25.0989 14.6332 25.0052 14.4253 24.9973 14.2055C24.9895 13.9857 25.0682 13.7716 25.2165 13.6092L35.0645 3.63531C35.2218 3.47894 35.4346 3.39117 35.6564 3.39117C35.8781 3.39117 36.0909 3.47894 36.2482 3.63531C36.3269 3.71336 36.3894 3.80621 36.432 3.90852C36.4746 4.01083 36.4966 4.12056 36.4966 4.23139C36.4966 4.34222 36.4746 4.45196 36.432 4.55426C36.3894 4.65657 36.3269 4.74943 36.2482 4.82747L26.4507 14.7762C26.3719 14.8565 26.2778 14.9202 26.174 14.9635C26.0702 15.0067 25.9587 15.0287 25.8462 15.028Z"
        fill={color}
      />
      <Path
        d="M21.4385 37.293C21.2158 37.293 21.0023 37.2045 20.8448 37.0471C20.6874 36.8896 20.5989 36.6761 20.5989 36.4534V13.4749C20.5967 12.503 20.9802 11.57 21.6652 10.8806L32.1176 0.251904C32.2772 0.113145 32.4833 0.0397427 32.6947 0.0463724C32.9061 0.0530022 33.1072 0.139175 33.2578 0.287664C33.4085 0.436152 33.4975 0.636015 33.5071 0.847296C33.5167 1.05858 33.4463 1.26571 33.3098 1.42728L22.8573 12.056C22.4857 12.4347 22.2776 12.9442 22.2781 13.4749V36.4534C22.2781 36.6761 22.1896 36.8896 22.0322 37.0471C21.8747 37.2045 21.6612 37.293 21.4385 37.293Z"
        fill={color}
      />
      <Path
        d="M15.5616 37.2929C15.339 37.2929 15.1254 37.2045 14.968 37.047C14.8105 36.8896 14.7221 36.676 14.7221 36.4534V13.4748C14.7198 12.9448 14.5122 12.4362 14.1428 12.056L3.69036 1.42726C3.60305 1.35136 3.53237 1.25824 3.48275 1.15374C3.43313 1.04923 3.40565 0.935599 3.40202 0.819971C3.3984 0.704342 3.41871 0.589212 3.46168 0.481803C3.50465 0.374394 3.56936 0.277025 3.65174 0.195805C3.73412 0.114586 3.83239 0.0512676 3.9404 0.00982403C4.04841 -0.0316195 4.16381 -0.0502941 4.27938 -0.0450281C4.39495 -0.0397621 4.50818 -0.0106691 4.61197 0.0404254C4.71576 0.09152 4.80787 0.163513 4.88252 0.251889L15.3433 10.8806C16.0221 11.5734 16.402 12.5049 16.4012 13.4748V36.4534C16.4012 36.676 16.3127 36.8896 16.1553 37.047C15.9978 37.2045 15.7843 37.2929 15.5616 37.2929Z"
        fill={color}
      />
      <Path
        d="M21.4385 18.3106H15.7044C15.4817 18.3106 15.2682 18.2222 15.1107 18.0647C14.9533 17.9073 14.8648 17.6937 14.8648 17.4711C14.8648 17.2484 14.9533 17.0349 15.1107 16.8774C15.2682 16.72 15.4817 16.6315 15.7044 16.6315H21.4385C21.6612 16.6315 21.8747 16.72 22.0322 16.8774C22.1896 17.0349 22.2781 17.2484 22.2781 17.4711C22.2781 17.6937 22.1896 17.9073 22.0322 18.0647C21.8747 18.2222 21.6612 18.3106 21.4385 18.3106Z"
        fill={color}
      />
    </Svg>
  );
}