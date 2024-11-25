
const countries = [
    {
        code:"NE", name:"Nepal"
    },

    {
        code:"US", name:"United States"
    },
    {
        code:"CA", name:"Canada",

    },
    {
        code:"GB", name:"United Kingdom"
    },
    {
        code:"AU", name:"Australia"
    },
    {
        code:"IN", name:"India"
    },
    
]


const states = {
    NE: ['Bagmati', 'Gandaki', 'Karnali', 'Lumbini', 'Mahakali', 'Mechi', 'Narayani', 'Rapti', 'Seti', 'Sudurpashchim'],
    US: ['California', 'Texas', 'Florida', 'New York', 'Illinois'],
    CA: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
    GB: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    AU: ['New South Wales', 'Victoria', 'Queensland', 'Tasmania', 'Western Australia'],
    IN: ['Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Karnataka'],
  };
  
module.exports ={
    countries,
    states
}