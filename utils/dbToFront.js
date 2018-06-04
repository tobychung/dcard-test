const _ = require("lodash");

const results = row => ({
  date: _.get(row, "Date", null),
  year: _.get(row, "Year", null),
  quarter: _.get(row, "Quarter", null),
  Date: _.get(row, "Date", null),
  month: _.get(row, "Month", null),
  materialNumber: _.get(row, "Material_Number", null),
  materialDescription: _.get(row, "Material_Description", null),
  units: _.get(row, "Units", null),
  aspLocal: _.get(row, "ASP_Local$", null),
  salesLocal: _.get(row, "Sales_Local$", null),
  materialHier2Name: _.get(row, "Material_Hier_2_Name", null),
  materialHier3Name: _.get(row, "Material_Hier_3_Name", null),
  materialHier4Name: _.get(row, "Material_Hier_4_Name", null),
  materialHier5Name: _.get(row, "Material_Hier_5_Name", null),
  customerName: _.get(row, "Customer_Name", null),
  area: _.get(row, "Area", null),
  sales: _.get(row, "Sales", null),
});

module.exports = {
  results,
}