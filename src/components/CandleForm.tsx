import { debounce, Grid, TextField, Typography } from '@material-ui/core';
import { Formik, useFormikContext } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';

interface AutoSaveProps {
  debounceMs: number
}

const AutoSave: FC<AutoSaveProps> = ({ debounceMs }) => {
  const formik = useFormikContext();
  const debouncedSubmit = useCallback(
    debounce(
      () => formik.submitForm(),
      debounceMs,
    ),
    [debounceMs, formik.submitForm],
  );

  useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  return (
    <>
    </>
  );
};

interface Values {
  numCandles: number,
  waterCapacity: number,
  scentPercentage: number,
  densityConversion: number,
}

const CandleForm = () => {
  const [waxTotal, setWaxTotal] = useState(0);
  const [waxPerCandle, setWaxPerCandle] = useState(0);
  const [scentTotal, setScentTotal] = useState(0);
  const [scentPerCandle, setScentPerCandle] = useState(0);

  return (
    <Formik
      initialValues={{
        numCandles: 24,
        waterCapacity: 180,
        scentPercentage: 6,
        densityConversion: 0.8,
      }}
      onSubmit={(values: Values) => {
        const candleWeightTotal = values.waterCapacity * values.densityConversion;
        const newScentPerCandle = candleWeightTotal * (values.scentPercentage / 100);
        const newWaxPerCandle = (
          candleWeightTotal
                    - newScentPerCandle
        );
        setWaxPerCandle(newWaxPerCandle);
        setWaxTotal(newWaxPerCandle * values.numCandles);
        setScentPerCandle(newScentPerCandle);
        setScentTotal(newScentPerCandle * values.numCandles);
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <AutoSave debounceMs={100} />
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Number of Candles"
              name="numCandles"
              type="number"
              value={values.numCandles}
              onChange={handleChange}
              error={touched.numCandles && Boolean(errors.numCandles)}
              helperText={touched.numCandles && errors.numCandles}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Water Capacity (ml)"
              name="waterCapacity"
              type="number"
              value={values.waterCapacity}
              onChange={handleChange}
              error={touched.waterCapacity && Boolean(errors.waterCapacity)}
              helperText={touched.waterCapacity && errors.waterCapacity}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Scent Load %"
              name="scentPercentage"
              type="number"
              value={values.scentPercentage}
              onChange={handleChange}
              error={touched.scentPercentage && Boolean(errors.scentPercentage)}
              helperText={touched.scentPercentage && errors.scentPercentage}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              label="Density Conversion"
              name="densityConversion"
              type="number"
              inputProps={{
                step: '0.1',
              }}
              value={values.densityConversion}
              onChange={handleChange}
              error={touched.densityConversion && Boolean(errors.densityConversion)}
              helperText={touched.densityConversion && errors.densityConversion}
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Typography>
              You need
            </Typography>
            <Typography>
              <strong>{waxTotal.toFixed(2)}</strong>
              {' '}
              grams of wax total.
            </Typography>
            <Typography>
              <strong>{waxPerCandle.toFixed(2)}</strong>
              {' '}
              grams per candle.
            </Typography>
            <Typography>
              <strong>{scentTotal.toFixed(2)}</strong>
              {' '}
              grams of scent total.
            </Typography>
            <Typography>
              <strong>{scentPerCandle.toFixed(2)}</strong>
              {' '}
              grams of per candle.
            </Typography>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default CandleForm;
