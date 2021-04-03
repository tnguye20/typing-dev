import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { LANGUAGES } from '../../interfaces';
import { config } from '../../shared';
import { analytics } from '../../libs';
import './LanguagePicker.css';
import { CardContent } from '@material-ui/core';
import { CopyBlock, hopscotch } from "react-code-blocks";
import { useHistory } from 'react-router-dom';
import { TYPING } from '../../routes';

const { CODE_SAMPLE_MAP } = config;

export const LanguagePicker: React.FC = () => {
  const history = useHistory();

  const handleOnClick = (language: string) => {
    history.push(`${TYPING}/${language}`);
    analytics.logEvent('start_typing', {
      language
    });
  }

  return (
    <Container maxWidth="lg" id='pickerContainer'>
      <div id='pickerCenter'>
        <Typography variant="h3" align='center'>Typing Dev</Typography>
        {/* <Typography variant="h5" align='center'>Improve your typing skill with code</Typography> */}
        <br />
        <Typography variant="h6" align='center'>Select one of the languages below to start.</Typography>
        <br />
        <Grid container spacing={1} direction="row">
          {
            Object.keys(LANGUAGES).map((l, index) => {
              const language = l as keyof typeof LANGUAGES;
              return (
                <Grid key={index} item md={6} sm={12} xs={12}>
                  <Card onClick={() => handleOnClick(language)}>
                    <CardHeader
                      title={language.toUpperCase()}
                      className={`${language}_title`}
                    />
                    <CardContent>
                      <CopyBlock
                        text={ CODE_SAMPLE_MAP[language] }
                        language={language}
                        showLineNumbers={false}
                        wrapLines
                        theme={hopscotch}
                        codeBlock={false}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )
            })
          }
      </Grid>
      </div>
    </Container>
  );
}