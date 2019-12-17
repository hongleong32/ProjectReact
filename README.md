# ProjectReact
simple weather app demo using React


# How to setup ReactJS environment
Please follow the steps from this website

https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm

Follow the steps start from "Using the create-react-app command" title until Step 2.

Once you have done setup, clone this project and copy all the scripts 
into src folder that you have created through steps just now.

Next, follow Step 4 from the website I had share to you.

Now you can play simple weather app demo.

Enjoy.


# How to use this app
There is green border box which shows empty on start.
Once you key in country name and click search, the box will change to country name that you want to search.
But it will show "city not found" if you key it wrongly.

Once search successfully, you can specify the refresh interval for tracking this city weather.
If you key in wrongly, it will automaticaly change to 10 seconds as default.

### How to add city into tracking list
After result been show in box, you can hover the box and click the box to add in to list.
Once you click, it will show the box under "Max number can be track: 3" sentence.
The box contain (interval refresh time, city name, weather icon and temperature).

You can add total of 3 on list. It cannot add same city name into the list.

### How to remove city from tracking list
When you hover the box that just show under "Max number can be track: 3" sentence, 
it's background will turn to red. And once you click, it will straight away remove from list.
