import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box, Text, Spinner
} from '@chakra-ui/react'
import { AddIcon, CheckIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import { useEffect, useState } from 'react';

interface AdminTableProps {
  table_caption: string;
  data: any[];
  headers: string[];
  handleAdd: (row: any) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, row: any) => void;
}

interface RowData {
  [key: string]: any;
}

function AdminTable({ table_caption, data, headers, handleAdd, handleDelete, handleUpdate }: AdminTableProps) {
  const [showAddRow, setShowAddRow] = useState(false);
  const [newRow, setNewRow] = useState<RowData>({});
  const [editing, setEditing] = useState<RowData>({});
  const [editingRowId, setEditingRowId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!data) return;
    setIsLoading(false);
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setNewRow({ ...newRow, [key]: e.target.value });
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setEditing({ ...editing, [key]: e.target.value });
  };

  const filteredHeaders = headers.filter(header => !['is_deleted', 'rents'].includes(header));

  const capitalize = (s: string) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" overflow="auto">
        <TableContainer width={"100%"} maxHeight={"100vh"} overflow={"auto"}>
          <Text fontSize="md" fontWeight="bold" textAlign="left" p={2}>{table_caption}</Text>
          {isLoading ? (
            <Box position="fixed" top="0" right="0" bottom="0" left="0" display="flex" alignItems="center" justifyContent="center">
              <Spinner color="green.500" />
            </Box>
          ) : (
            <Table variant='simple' size="sm">
              <Thead>
                <Tr>
                  {filteredHeaders.map((header, index) => (
                    <Th key={index} fontSize="xs">{capitalize(header)}</Th>
                  ))}
                  <Th fontSize="xs"></Th>
                  <Th fontSize="xs"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {(data && data.length === 0 && !showAddRow) ? (
                  <Tr>
                    {filteredHeaders.map((header, index) => (
                      <Td key={index} fontSize="xs">
                        <Input
                          placeholder={capitalize(header)}
                          value={newRow[header] || ''}
                          onChange={(e) => handleInputChange(e, header)}
                          size="sm"
                        />
                      </Td>
                    ))}
                    <Td fontSize="xs">
                      {isAdding ? (
                        <CheckIcon onClick={() => {
                          if (Object.values(newRow).every(value => value !== '')) {
                            handleAdd(newRow);
                            setNewRow({});
                            setIsAdding(false);
                          }
                        }} />
                      ) : (
                        <AddIcon onClick={() => setIsAdding(true)} />
                      )}
                    </Td>
                  </Tr>
                ) : (
                  data && data.map((row, index) => (
                    <Tr key={index}>
                      {filteredHeaders.map((header, index) => (
                        <Td key={index} fontSize="xs" style={header === 'image_url' ? { maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {}}>
                          {editingRowId === row.id_ ? (
                            <Input
                              value={editing && editing[header] || ''}
                              onChange={(e) => handleEditingChange(e, header)}
                              size="sm"
                            />
                          ) : (
                            <span onClick={() => { setEditingRowId(row.id_); setEditing({ ...row }); }}>
                              {row[header]}
                            </span>
                          )}
                        </Td>
                      ))}
                      <Td fontSize="xs">
                        <DeleteIcon onClick={() => handleDelete(row.id_)} />
                        <RepeatIcon onClick={() => { handleUpdate(row.id_, editing); setEditing({}); setEditingRowId(null); }} />
                      </Td>
                      <Td fontSize="xs">
                        {index === data.length - 1 && !showAddRow && <AddIcon onClick={() => setShowAddRow(true)} />}
                      </Td>
                    </Tr>
                  ))
                )}
                {showAddRow && (
                  <Tr>
                    {filteredHeaders.map((header, index) => (
                      <Td key={index} fontSize="xs">
                        <Input
                          placeholder={capitalize(header)}
                          value={newRow[header] || ''}
                          onChange={(e) => handleInputChange(e, header)}
                          size="sm"
                        />
                      </Td>
                    ))}
                    <Td fontSize="xs">
                      <CheckIcon onClick={() => {
                        if (Object.values(newRow).every(value => value !== '')) {
                          handleAdd(newRow);
                          setShowAddRow(false);
                          setNewRow({});
                        }
                      }} />
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </>
  )
}

export default AdminTable;
