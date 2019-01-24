class elements { //Elements class
    constructor(name, symbol, aNumber, aMass, valency, EMF, type){
        this.name = name;
        this.symbol = symbol;
        this.aNumber = aNumber;
        this.aMass = aMass;
        this.valency = valency;
        this.EMF = EMF;
        this.type = type;
    }
}

class fuels { //Elements class
    constructor(name, chemicalname, molarmass, heat){
        this.name = name;
        this.chemicalname = chemicalname;
        this.molarmass = molarmass;
        this.heat = heat;
    }
}

class equations{
    constructor(reactant1, reactant2, product1, product2, R1, R2, P1, P2, RMM1, RMM2, PMM1, PMM2){
        this.reactant1 = reactant1;
        this.reactant2 = reactant2;
        this.product1 = product1;
        this.product2 = product2;
        this.R1 = R1; //molar ratio of reactant 1 
        this.R2 = R2; //molar ratio of reactant 2
        this.P1 = P1; //molar ratio of product 1 
        this.P2 = P2; //molar ratio of product 2
        this.RMM1 = RMM1; // molar mass of reactant 1 
        this.RMM2 = RMM2; // molar mass of reactant 2 
        this.PMM1 = PMM1; // molar mass of product 1 
        this.PMM2 = PMM2; // molar mass of product 2

    }
}



var pTable = [
// (name, symbol, number, mass, valency, emf, type)
hydrogen = new elements("hydrogen", "H", 1, 1.0008, 1, 0, "nonmetal"),
helium = new elements("helium", "He", 2 , 4.0026, null, null, "nonmetal"),
lithium = new elements("lithium", "Li", 3, 6.94, 1, -3.04, "metal"),
beryllium = new elements("beryllium", "Be", 4, 9.0122, 2, -1.99, "metal"),
boron = new elements("boron", "B", 5, 10.81, 3, null, "semimetal"),
carbon = new elements("carbon", "C", 6, 12.011, 4, null, "nonmetal"),
nitrogen = new elements("nitrogen", "N", 7, 14.007, -3, null, "nonmetal"),
oxygen = new elements("oxygen", "O", 8, 15.999, 2, null,  "nonmetal"),
sodium = new elements("sodium", "Na", 11, 22.990, 1, -2.71, "metal")
]

var commonfuels = [
// (name, chemicalname, molarmass, heat of combustion)
ethanol = new fuels("ethanol", "C2H5OH", 46.07, 1360),
methane = new fuels("methane", "CH4", 16.04, 890),
propane = new fuels("propane", "C3H8", 44.1, 2220)
]

var commonequations = [
// (reactant1, reactan2, product1, product2, ratios, masses)
E1 = new equations("CO2", "H2O", "C6H12O6", "O2", 6, 6, 1, 6, 44.01, 18.02, 180.16, 32),
E2 = new equations("C6H12O6", "O2", "H2O", "CO2", 1, 6, 6, 6, 180.16, 32, 18.02, 44.01),
E3 = new equations("C3H8", "O2", "H2O", "CO2", 1, 5, 4, 3, 44.1, 32, 18.02, 44.01),
E4 = new equations("PCl5", "H2O", "H3PO4", "HCl", 1, 4, 1, 5, 208.24, 18.02, 97.994, 36.46)
]






