import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSlovakDay } from "../Components/utils/GetSlovakDay";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const HomePageTeacher = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Všetky predmety");
  const id_teacher = useSelector((state) => state.id);
  const navigate = useNavigate();

  useEffect(() => {
    const day = getSlovakDay(new Date().getUTCDay());
    fetch(
      selectedSubject && selectedSubject !== "Všetky predmety"
        ? `http://localhost:8080/prehladPredmetov/${id_teacher}?den=${day}&nazov_predmetu=${selectedSubject}`
        : `http://localhost:8080/prehladPredmetov/${id_teacher}?den=${day}`
    )
      .then((r) => {
        if (!r.ok) {
          throw new Error("Failed to retrieve data");
        }
        return r.json();
      })
      .then((d) => setSubjects(d))
      .catch((e) => console.error(e));
  }, [selectedSubject, id_teacher]);

  useEffect(() => {
    fetch(`http://localhost:8080/prehladPredmetov/predmetyUcitel/${id_teacher}`)
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
      .catch((e) => console.error(e));
  }, [id_teacher]);

  const templateQrLink = (row) => {
    const handleClick = (id_predmet) => {
      navigate("/qrCode", { state: { id_predmet } });
    };

    return (
      <span
        onClick={() => handleClick(row.id_predmet)}
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "blue",
        }}
      >
        Vygeneruj a zobraz QR kód
      </span>
    );
  };

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
            {/* <select
            className="form-control"
            id="subjectDropdown"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            {subjectNames.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select> */}
          </div>
        </div>
        {subjects.length === 0 ? (
          <div className="noDataMessage">
            <p>Pre zvolený deň neexistuje záznam</p>
          </div>
        ) : (
          <div className="m-4">
            <DataTable stripedRows value={subjects}>
              <Column field="nazov_predmetu" header="Predmet"></Column>
              <Column field="den" header="Deň"></Column>
              <Column field="skupina" header="Skupina"></Column>
              <Column field="cas" header="Čas"></Column>
              <Column
                /* field="id_predmet" */
                header="QR kód"
                body={templateQrLink}
                /* onClick={() => handleClick(subjects.id_predmet)} */
              />
            </DataTable>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePageTeacher;

/* <div className="d-flex justify-content-center">
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Predmet</th>
                <th>Deň</th>
                <th>Skupina</th>
                <th>Čas</th>
                <th>QR kód</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((row, i) => (
                <tr key={i}>
                  <td>{row.nazov_predmetu}</td>
                  <td>{row.den}</td>
                  <td>{row.skupina}</td>
                  <td>{row.cas}</td>
                  <td>
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick(row.id_predmet)}
                    >
                      Vygeneruj a zobraz QR kód
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> 
      )}  */
