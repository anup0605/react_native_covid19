import { ExternalCallout } from '@covid/components/ExternalCallout';
import { IFeaturedContent } from '@covid/core/content/dto/ContentAPIContracts';
import { TRootState } from '@covid/core/state/root';
import * as React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

export enum EFeaturedContentType {
  Home,
  ThankYou,
}

export type TProps = {
  type: EFeaturedContentType;
  screenName: string;
  disableLoadingState?: boolean;
};

export const FeaturedContentList: React.FC<TProps> = ({ type, screenName, disableLoadingState }) => {
  const home = useSelector<TRootState, IFeaturedContent[]>((state) => state.content.featuredHome);
  const thankyou = useSelector<TRootState, IFeaturedContent[]>((state) => state.content.featuredThankyou);

  const mapper = (item: IFeaturedContent) => (
    <View key={item.slug} testID="featured-content-callout">
      <ExternalCallout
        aspectRatio={item.thumbnail_aspect_ratio}
        calloutID={item.slug}
        disableLoadingState={disableLoadingState}
        imageSource={{ uri: item.thumbnail_image_url }}
        link={item.link}
        orderIndex={item.order_index}
        screenName={screenName}
      />
    </View>
  );

  const content = () => {
    switch (type) {
      case EFeaturedContentType.Home:
        return home?.map(mapper);
      case EFeaturedContentType.ThankYou:
        return thankyou?.map(mapper);
      default:
        return null;
    }
  };

  return <>{content()}</>;
};
