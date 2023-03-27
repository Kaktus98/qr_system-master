import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { exportToExcel } from "../Components/utils/ExportToExcel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TeacherAttendancePage = () => {
  const [studentList, setStudentList] = useState([]);

  const { state } = useLocation();
  const { id_predmet, datum, skupina, nazov_predmetu } = state;
  datum.setHours(20);
  useEffect(() => {
    const fetchData = async () => {
      const [response1, response2] = await Promise.all([
        fetch(
          `http://localhost:8080/prehlad/ucitel/${id_predmet}?datum=${datum
            .toISOString()
            .slice(0, 10)}`
        ),
        fetch(`http://localhost:8080/prehlad/ucitelZoznam/${id_predmet}`),
      ]);

      let pritomniStudenti = await response1.json();
      let vsetciStudenti = await response2.json();

      // Perform some operations on the data
      vsetciStudenti = vsetciStudenti
        .map((student) => {
          // kazdy stundet je nepritomny
          student.status = "Neprítomný";
          return student;
        })
        .map((student) => {
          // hladame vsetkych studenotov, kt su pritomny a su z danej hodiny
          if (
            pritomniStudenti
              .map((s) => s.id_student)
              .includes(student.id_student)
          ) {
            student.status = "Prítomný";
          }
          return student;
        });

      pritomniStudenti
        .filter(
          (s) => !vsetciStudenti.map((x) => x.id_student).includes(s.id_student)
        )
        .map((s) => {
          const { meno, priezvisko, id_student } = s;
          return {
            id_predmet: id_predmet,
            id_student,
            meno,
            priezvisko,
            status: "Náhrada hodiny",
          };
        })
        .forEach((x) => vsetciStudenti.push(x));
      setStudentList(vsetciStudenti);
    };

    fetchData();
  }, [id_predmet, datum]);

  const handleExport = () => {
    exportToExcel(studentList, `${nazov_predmetu}_Sk${skupina}_${datum}`);
  };

  const statusBodyTemplate = (row) => {
    const statusStyle = {
      background:
        row.status === "Prítomný"
          ? "#79d191"
          : row.status === "Neprítomný"
          ? "#DB8C87"
          : "#E3D27F",
      display: "block",
      padding: "0.5rem",
      border: "1px solid #000000",
    };
    return <span style={statusStyle}>{row.status}</span>;
  };

  return (
    <>
      <div className="mr-1 ml-1 mt-3">
        <div className="m-4">
          <DataTable stripedRows value={studentList}>
            <Column field="meno" header="Meno"></Column>
            <Column field="priezvisko" header="Priezvisko"></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
            ></Column>
          </DataTable>
        </div>
        <button
          className="mt-3"
          onClick={handleExport}
          style={{ backgroundColor: "#339E53" }}
        >
          Exportovanie do Excelu
        </button>
      </div>
    </>
  );
};

export default TeacherAttendancePage;

/* <table>
          <thead>
            <tr>
              <th>Meno</th>
              <th>Priezvisko</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((row, i) => (
              <tr key={i}>
                <td>{row.meno}</td>
                <td>{row.priezvisko}</td>
                <td
                  style={{
                    background:
                      row.status === "Pritomný"
                        ? "#79d191"
                        : row.status === "Nepritomný"
                        ? "#DB8C87"
                        : "#E3D27F",
                  }}
                >
                  {row.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table> */
