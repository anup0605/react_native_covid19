import { colors } from '@theme/colors';
import * as React from 'react';
import { G, Path, Svg } from 'react-native-svg';

function QuestionMarks() {
  return (
    <Svg height="179px" viewBox="0 0 160 179" width="160px">
      <G fill="none" fill-rule="evenodd" id="Page-1" opacity="0.04" stroke="none" stroke-width="1">
        <G fill={colors.brand} fill-rule="nonzero" id="Group">
          <G id="Shape">
            <Path d="M26.9329,87.195 L36.3326,84.2987 L34.9452,76.6324 C33.0292,67.1468 37.9845,62.977 45.0938,58.3087 C56.0452,51.1351 63.5181,37.1047 60.5342,22.332 C56.8907,4.2938 40.9217,-3.00897 25.0028,1.8961 C9.5388,6.6611 -1.99611,22.1083 0.92074,40.5356 L10.3205,37.6392 C8.6545,24.6078 16.578,14.4029 26.8874,11.2262 C37.8032,7.8627 48.4387,12.6794 50.9829,25.2751 C52.9931,35.2272 47.7986,44.5912 40.4803,49.8195 L34.7041,53.9118 C27.1768,59.7 22.4522,66.6067 25.3938,79.5754 L26.9329,87.195 Z M37.5377,114.981 C41.7828,113.673 44.6416,109.489 43.7935,105.29 C42.914,100.936 38.7989,98.9 34.5538,100.209 C30.3088,101.517 27.45,105.701 28.3295,110.055 C29.1775,114.254 33.2927,116.289 37.5377,114.981 Z" />
            <Path d="M116.999,148.252 L129.799,149.766 L130.068,146.296 C130.497,140.77 134.318,139.795 139.44,138.715 C149.673,136.682 158.051,128.594 159.017,116.129 C160.212,100.707 149.823,89.752 135.23,88.0273 C120.637,86.3021 107.71,94.76 106.375,111.98 L120.2,113.615 C121.103,105.292 127.616,101.263 133.888,102.005 C140.673,102.807 145.218,107.494 144.65,114.819 C144.282,119.574 140.979,123.853 135.72,125.047 L131.228,126.331 C121.329,129.051 117.316,134.154 117.14,144.767 L116.999,148.252 Z M121.118,178.438 C126.495,179.074 131.156,175.604 131.584,170.078 C132.002,164.681 127.969,160.054 122.592,159.418 C117.216,158.783 112.417,162.366 111.999,167.763 C111.571,173.289 115.742,177.803 121.118,178.438 Z" />
            <Path d="M113.231,56.1436 L106.049,52.4473 L104.749,56.0053 C103.291,60.3272 100.331,60.2832 96.388,59.6272 C89.0683,58.3962 81.2201,61.9654 78.2734,70.6992 C74.6583,81.4139 79.8152,91.994 88.9403,96.69 C97.896,101.3 108.691,98.402 112.634,87.0104 L105.621,83.401 C102.822,90.52 96.47,92.006 91.401,89.397 C86.1625,86.7009 83.4369,80.9654 85.6241,74.4826 C87.2949,69.5304 91.69,67.6714 96.009,68.0976 L99.246,68.4957 C104.9,69.0806 109.535,67.9792 112.016,59.7452 L113.231,56.1436 Z M116.001,35.589 C113.044,34.067 109.804,35.1469 108.74,38.2983 C107.677,41.4496 109.338,45.0518 112.295,46.5738 C115.252,48.0959 118.492,47.016 119.555,43.8646 C120.619,40.7132 118.958,37.1111 116.001,35.589 Z" />
          </G>
        </G>
      </G>
    </Svg>
  );
}

export default QuestionMarks;
