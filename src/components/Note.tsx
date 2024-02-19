import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";

const Note = () => {
  const note = useNote();
  return (
    <>
      <Row className="align-item-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 ? (
            <Stack
              gap={2}
              className="align-items-center justify-content-center h-100"
            >
              {note.tags.length > 0 ? (
                <Stack gap={1} direction="horizontal" className=" flex-wrap">
                  {note.tags.map((tag) => (
                    <Badge key={tag.id} className="text-truncate">
                      {tag.label}
                    </Badge>
                  ))}
                </Stack>
              ) : null}
            </Stack>
          ) : null}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button variant="outline-danger">Delete</Button>
            <Link to="..">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default Note;
