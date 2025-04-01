import React, { useState } from "react";
import DynamicBottomNavigation from "../atoms/BottomNavigation";
import { ButtonVariants } from "../components_gallery/botton";
import { BadgeGallery } from '../components_gallery/badge';
import { CardGallery } from '../components_gallery/card';
import { AlertsGallery } from '../components_gallery/Alerts';
import { AvatarGallery } from '../components_gallery/Avatars';
import { BoxAutoComplete } from '../components_gallery/BoxAutoComplete';

/* ICONS */
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';

import Panel from "../atoms/Panel";
import CustomSelect from "../atoms/Select";
import CustomCheckbox from "../atoms/Checkbox";
import CustomTextField from "../atoms/TextField";

const Tests = () => {
  const [selectedValue, setSelectedValue] = useState('home');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [textValue, setTextValue] = useState('');

  const navItems = [
    { label: 'Inicio', icon: <HomeIcon />, value: 'home' },
    { label: 'Buscar', icon: <SearchIcon />, value: 'search' },
    { label: 'Perfil', icon: <PersonIcon />, value: 'profile' }
  ];

  const handleCheckboxChange = (event) => {
    setCheckboxChecked(event.target.checked);
    console.log('Checkbox checked:', event.target.checked);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
    console.log('Select value:', event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
    console.log('Text field value:', event.target.value);
  };

  return (
    <div>
      <ButtonVariants />

      <center><h1>Estás en la página: {selectedValue}</h1></center>
      <DynamicBottomNavigation 
        items={navItems}
        initialValue={selectedValue}
        onChange={(newValue) => {
          setSelectedValue(newValue);
          console.log('Navigation value:', newValue);
        }} // Actualiza el estado
      />

      <BadgeGallery />
      <CardGallery />

      {/* Alertas */}
      <AlertsGallery />

      {/*Avatares  */}
      <AvatarGallery />

      {/*autocomplente  */}
      <BoxAutoComplete />

      {/* Espacio blanco al final */}
      <div style={{height: 50}}></div>
      <div>
        <Panel>
          <CustomCheckbox
            label="Check me"
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
          <CustomSelect
            label="Select an option"
            value={selectValue}
            onChange={handleSelectChange}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' }
            ]}
          />
          <CustomTextField
            label="Enter text"
            value={textValue}
            onChange={handleTextChange}
          />
        </Panel>
      </div>
    </div>
  );
};

export default Tests;