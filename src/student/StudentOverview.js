import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { getSlovakDay } from "../Components/utils/GetSlovakDay";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Spinner from "../Components/spinner/Spinner";

const StudentOverview = () => {
  const [data, setData] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Všetky predmety");
  const id_student = useSelector((state) => state.id);
  const [selectedDay, setSelectedDay] = useState(
    getSlovakDay(new Date().getUTCDay())
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const randomLoading = isLoading || isLoading1;
  

  useEffect(() => {
    setIsLoading(true);
    fetch(
      selectedSubject && selectedSubject !== "Všetky predmety"
        ? `http://localhost:8080/prehlad/student/${id_student}?den=${selectedDay}&nazov_predmetu=${selectedSubject}`
        : `http://localhost:8080/prehlad/student/${id_student}?den=${selectedDay}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setData(d))
      .catch((e) => console.error(e))
      .finally(setIsLoading(false));
  }, [selectedSubject, id_student, selectedDay]); //ak sa zmeni jedna z hodnout tak sa zmení aj URL

  useEffect(() => {
    //setIsLoading(true);
    fetch(
      `http://localhost:8080/prehladPredmetov/predmetyStudent/${id_student}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => {
        const names = [...new Set(d.map((subject) => subject.nazov_predmetu))];
        setSubjectNames(["Všetky predmety", ...names]);
      })
      .catch((e) => console.error(e))
      .finally(setIsLoading1(false));
  }, [id_student]);

  const statusBodyTemplate = (row) => {
    const statusStyle = {
      background: row.status ? "#7AEA90" : "#D98886",
      display: "block",
      padding: "0.5rem",
      border: "1px solid #000000",
    };
    return (
      <span style={statusStyle}>{row.status ? "Prítomný" : "Neprítomný"}</span>
    );
  };

  const weekDays = [
    "Pondelok",
    "Utorok",
    "Streda",
    "Stvrtok",
    "Piatok",
    "Sobota",
    "Nedela",
  ];

  if (randomLoading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="mr-1 ml-1 mt-3">
          <div className="flex flex-column lg:flex-row lg:justify-content-around justify-content-center ">
            <div className="w-full lg:w-16rem mb-3">
              <Dropdown
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={subjectNames}
                className="w-full"
              />
            </div>
            <div className="w-full lg:w-16rem mb-3">
              <Dropdown
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                options={weekDays}
                className="w-full"
              />
            </div>
          </div>
          {data.length === 0 ? (
            <div className="noDataMessage">
              <p>Pre zvolený deň neexistuje záznam</p>
            </div>
          ) : (
            <div className="m-4">
              <DataTable stripedRows value={data}>
                <Column field="meno" header="Meno"></Column>
                <Column field="priezvisko" header="Priezvisko"></Column>
                <Column field="den" header="deň"></Column>
                <Column field="nazov_predmetu" header="Predmet"></Column>
                <Column
                  field="status"
                  header="Status"
                  body={statusBodyTemplate}
                />
                <Column field="datum" header="Dátum"></Column>
              </DataTable>
            </div>
          )}
        </div>
      </>
    );
  }
};

export default StudentOverview;

/* <table className="p-table table-striped table-bordered table-hover align-middle">
            <thead>
              <tr>
                <th>Meno</th>
                <th>Priezvisko</th>
                <th>Deň</th>
                <th>Predmet</th>
                <th>Status</th>
                <th>Dátum </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="hoverable">
                  <td>{row.meno}</td>
                  <td>{row.priezvisko}</td>
                  <td>{row.den}</td>
                  <td>{row.nazov_predmetu}</td>
                  <td
                    style={{
                      background: row.status ? "#7AEA90" : "#D98886",
                    }}
                  >
                    {row.status ? "Prítomný" : "Neprítomný"}
                  </td>
                  <td>{row.datum}</td>
                </tr>
              ))}
            </tbody>
          </table> */
