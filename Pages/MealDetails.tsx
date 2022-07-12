import React from 'react';
import {View} from 'react-native';
import {
  Button,
  Divider,
  Headline,
  List,
  Surface,
  Text,
  useTheme,
} from 'react-native-paper';

const MealDetails = () => {
  const {colors} = useTheme();

  return (
    <View style={{paddingHorizontal: 25}}>
      <Headline style={{marginVertical: 25, alignSelf: 'center'}}>
        Meal Details
      </Headline>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 18}}>Day 1</Text>
        <Text style={{fontSize: 18}}>October 1st</Text>
      </View>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        <List.Section>
          <List.AccordionGroup>
            <List.Subheader>Breakfast</List.Subheader>
            <Divider />
            <List.Accordion
              title={<Text style={{color: colors.accent}}>Eggs</Text>}
              id="1"
              style={{borderColor: '#000', borderRightWidth: 1}}>
              <List.Item title="Eggs" />
              <Button
                mode="contained"
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: colors.accent,
                }}
                onPress={() => console.log('Ingredient added!')}>
                Add Ingredient
              </Button>
            </List.Accordion>
          </List.AccordionGroup>
        </List.Section>
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        <List.Section>
          <List.AccordionGroup>
            <List.Subheader>Lunch</List.Subheader>
            <List.Accordion
              title={<Text style={{color: colors.accent}}>Sandwiches</Text>}
              id="1"
              style={{borderColor: '#000', borderRightWidth: 1}}>
              <List.Item title="Bread" />
              <List.Item title="Turkey" />
              <List.Item title="Cheese" />
              <List.Item title="Lettuce" />
              <Button
                mode="contained"
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: colors.accent,
                }}
                onPress={() => console.log('Ingredient added!')}>
                Add Ingredient
              </Button>
            </List.Accordion>
            <List.Accordion
              title={<Text style={{color: colors.accent}}>Chips</Text>}
              id="2"
              style={{borderColor: '#000', borderRightWidth: 1}}>
              <List.Item title="Chips" />
              <Button
                mode="contained"
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: colors.accent,
                }}
                onPress={() => console.log('Ingredient added!')}>
                Add Ingredient
              </Button>
            </List.Accordion>
          </List.AccordionGroup>
        </List.Section>
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
      <Surface
        style={{
          marginVertical: 10,
          borderRadius: 5,
          borderColor: '#000',
          borderWidth: 1,
          elevation: 7,
        }}>
        <List.Section>
          <List.AccordionGroup>
            <List.Subheader>Dinner</List.Subheader>
            <List.Accordion
              title={<Text style={{color: colors.accent}}>Cheeseburgers</Text>}
              id="1"
              style={{borderColor: '#000', borderRightWidth: 1}}>
              <List.Item title="Beef" />
              <List.Item title="Buns" />
              <List.Item title="Cheese" />
              <Button
                mode="contained"
                style={{
                  width: '75%',
                  alignSelf: 'center',
                  backgroundColor: colors.accent,
                }}
                onPress={() => console.log('Ingredient added!')}>
                Add Ingredient
              </Button>
            </List.Accordion>
          </List.AccordionGroup>
        </List.Section>
        <Button
          mode="contained"
          style={{maxWidth: '75%', alignSelf: 'center', marginBottom: 10}}>
          Add Menu Item
        </Button>
      </Surface>
    </View>
  );
};

export default MealDetails;
