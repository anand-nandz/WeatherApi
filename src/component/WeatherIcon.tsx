import React from 'react';
import { BsFillCloudRainFill, BsFillSunFill, BsCloudyFill, BsCloudFog2Fill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WeatherIconProps } from '../interface/interface';

const WeatherIcon: React.FC<WeatherIconProps> = ({ weather,size='1rem' }) => {
  let iconElement: React.ReactNode;
  let iconColor: string;
  const iconProps = { size: size };

  switch (weather) {
    case 'Rain':
      iconElement = <BsFillCloudRainFill {...iconProps}/>;
      iconColor = "#272829";
      break;
    case 'Clear':
      iconElement = <BsFillSunFill {...iconProps}/>;
      iconColor = "#FFC436";
      break;
    case 'Clouds':
      iconElement = <BsCloudyFill {...iconProps}/>;
      iconColor = "#102C57";
      break;
    case 'Mist':
      iconElement = <BsCloudFog2Fill {...iconProps}/>;
      iconColor = "#279EFF";
      break;
    default:
      iconElement = <TiWeatherPartlySunny {...iconProps}/>;
      iconColor = "#7B2869";
  }

  return (
    <span className="text-[9rem] mb-[10px] font-inter" style={{ color: iconColor }}>
      {iconElement}
    </span>
  );
};

export default WeatherIcon;
