import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { useIntl } from 'react-intl';

import {
  Empty,
  Skeleton,
  Spinner,
  Stack,
  XStack,
  YStack,
  useMedia,
} from '@onekeyhq/components';
import useFormatDate from '@onekeyhq/kit/src/hooks/useFormatDate';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import platformEnv from '@onekeyhq/shared/src/platformEnv';
import type { IMarketTokenChart } from '@onekeyhq/shared/types/market';

import ChartView from './ChartView';
import { PriceLabel } from './PriceLabel';

import type { BusinessDay, UTCTimestamp } from 'lightweight-charts';

type IPriceChartProps = {
  data?: IMarketTokenChart;
  children: ReactNode;
  isFetching: boolean;
};

type IOnHoverFunction = ({
  time,
  price,
}: {
  time?: UTCTimestamp | BusinessDay | Date | string;
  price?: number | string;
}) => void;

export function PriceChart({ data, isFetching, children }: IPriceChartProps) {
  const { formatDate } = useFormatDate();
  const intl = useIntl();

  const [price, setPrice] = useState<string | number | undefined>();
  const [time, setTime] = useState('');
  const { gtMd } = useMedia();
  const basePrice = data?.length ? data[0][1] : 0;
  const latestPrice = data?.length ? data[data.length - 1][1] : 0;
  const currentPrice = useMemo(() => {
    if (!data) {
      return null;
    }
    if (price === 'undefined' || price === undefined) {
      return latestPrice;
    }
    if (typeof price === 'string') {
      return +price;
    }
    return price;
  }, [data, latestPrice, price]);

  const onHover = useCallback<IOnHoverFunction>(
    (hoverData) => {
      // The first data of each hover is an empty string, which needs to be filtered
      if (hoverData.price === '' && hoverData.time === '') {
        return;
      }
      let displayTime;
      if (hoverData.time instanceof Date) {
        displayTime = formatDate(hoverData.time);
      } else if (typeof hoverData.time === 'number') {
        displayTime = formatDate(new Date(hoverData.time));
      } else if (typeof hoverData.time === 'string') {
        displayTime = formatDate(new Date(+hoverData.time));
      } else {
        displayTime = '';
      }
      setTime(displayTime);
      setPrice(hoverData.price);
    },
    [formatDate],
  );

  const priceLabel = (
    <PriceLabel
      opacity={time ? 1 : 0}
      price={currentPrice}
      time={time || ''}
      basePrice={basePrice}
    />
  );

  const emptyView = useMemo(() => {
    if (isFetching) {
      return <Spinner />;
    }
    return (
      <Empty
        title={intl.formatMessage({
          id: ETranslations.global_no_data,
        })}
      />
    );
  }, [intl, isFetching]);

  const chartView =
    data && data.length > 0 ? (
      <ChartView
        isFetching={isFetching}
        height={450}
        data={data}
        onHover={onHover}
      />
    ) : (
      emptyView
    );

  const chartViewWithSpinner = isFetching ? <Spinner /> : chartView;
  return gtMd ? (
    <>
      <XStack justifyContent="space-between" h="$10">
        {isFetching ? (
          <YStack gap="$2">
            <Skeleton w="$10" h="$3" />
            <Skeleton w="$24" h="$3" />
          </YStack>
        ) : (
          priceLabel
        )}
        {children}
      </XStack>
      <Stack
        h={406}
        mt={32}
        $gtMd={{ mt: '$1' }}
        justifyContent="center"
        alignItems="center"
      >
        {chartViewWithSpinner}
      </Stack>
    </>
  ) : (
    <>
      {priceLabel}
      <Stack h={410} justifyContent="center" alignItems="center">
        {platformEnv.isNative ? chartView : chartViewWithSpinner}
      </Stack>
      <Stack>{children}</Stack>
    </>
  );
}
