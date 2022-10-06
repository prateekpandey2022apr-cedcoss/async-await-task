import React, { useEffect, useCallback, useState } from "react";
import {
  Page,
  Badge,
  Card,
  Select,
  TextContainer,
  Button,
  Loading,
  Frame,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useFetch } from "./useFetch";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({});
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [showAttrs, setShowAttrs] = useState(false);
  const [attr, setAttr] = useState({});
  const [attrOptions, setAttrOptions] = useState([]);
  const [selectedAttrs, setSelectedAttrs] = useState([]);
  // const [attrOptions, setAttrOptions] = useState([]);

  //  track how many times Add Button is clicked
  const [attrCounter, setAttrCounter] = useState(0);

  const { _post } = useFetch(
    "https://multi-account.sellernext.com/home/public/connector/profile/"
  );

  useEffect(() => {
    // debugger;
    (async () => {
      setIsLoading(true);
      if (showAttrs) {
        try {
          const response = await _post("getCategoryAttributes", {
            target_marketplace:
              "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
            data: {
              barcode_exemption: false,
              browser_node_id: "1380072031",
              category: attr.category?.["primary-category"],
              sub_category: attr.category?.["sub-category"],
            },
            user_id: "63329d7f0451c074aa0e15a8",
            target: {
              marketplace: "amazon",
              shopId: "530",
            },
            source: {
              marketplace: "shopify",
              shopId: "500",
            },
          });

          // debugger;
          console.log("get attrs");
          console.log(response);

          const _attrOptions = [
            {
              label: "Select attribute",
              value: "",
              disabled: true,
            },
          ];

          for (let outer in response.data) {
            console.log(response.data[outer]);
            for (let inner in response.data[outer]) {
              console.log(inner, response.data[outer][inner].label);
              _attrOptions.push({
                label: response.data[outer][inner].label,
                value: inner,
              });
            }
          }

          // debugger;
          setAttrOptions([..._attrOptions]);
        } catch (error) {
          console.error(error);
          alert(error);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [showAttrs]);

  useEffect(() => {
    (async () => {
      if (selected.length > 0) {
        debugger;
        if (productData[selected[selected.length - 1]]?.hasChildren) {
          try {
            setIsLoading(true);
            const response = await _post("getAllCategory", {
              target_marketplace:
                "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
              selected: productData[selected[selected.length - 1]].parent_id,
              user_id: "63329d7f0451c074aa0e15a8",
              target: {
                marketplace: "amazon",
                shopId: "530",
              },
            });
            // .then((response) => {
            console.log(response);

            const _options = [
              { label: "Select ...", value: "", disabled: true },
            ];
            const _productData = productData;

            response.data.forEach((element) => {
              _options.push({
                label: element.name,
                value: element.browseNodeId,
                // value: JSON.stringify(element.parent_id),
                // category: element.category,
              });

              _productData[element.browseNodeId] = {
                parent_id: element.parent_id,
                category: element.category,
                hasChildren: element.hasChildren,
              };
            });
            // debugger;
            // setHasChildren(response.hasChildren);
            setProductData({ ..._productData });
            setOptions([...options, _options]);
          } catch (error) {
            console.log(error);
            alert(error);
          } finally {
            setIsLoading(false);
          }
        } else {
          setShowAttrs(true);
        }
      }
    })();
  }, [selected]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const response = await _post("getAllCategory", {
          target_marketplace:
            "eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9",
          selected: [],
          user_id: "63329d7f0451c074aa0e15a8",
          target: {
            marketplace: "amazon",
            shopId: "530",
          },
        });

        console.log(response);
        const _options = [{ label: "Select ...", value: "", disabled: true }];
        const _productData = productData;
        response.data.forEach((element) => {
          // debugger;
          _options.push({
            label: element.name,
            value: element.browseNodeId,
          });

          _productData[element.browseNodeId] = {
            parent_id: element.parent_id,
            category: element.category,
            hasChildren: element.hasChildren,
          };
        });

        // debugger;
        setProductData({ ..._productData });
        setOptions([...options, _options]);
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  function createAttrs(idx) {
    // debugger;
    const optionsCopy = JSON.parse(JSON.stringify(attrOptions));

    optionsCopy.map((item) => {
      if (selectedAttrs.includes(item.value)) {
        item.disabled = true;
        return item;
      }
      return item;
    });

    // optionsCopy
    return optionsCopy;
  }

  return (
    <Page
      breadcrumbs={[{ content: "Products", url: "/products" }]}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge status="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{ content: "Save", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
        {
          content: "View on your store",
          onAction: () => alert("View on your store action"),
        },
      ]}
      actionGroups={[
        {
          title: "Promote",
          accessibilityLabel: "Action group label",
          actions: [
            {
              content: "Share on Facebook",
              accessibilityLabel: "Individual action label",
              onAction: () => alert("Share on Facebook action"),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <>
        {isLoading && (
          <div style={{ height: "0px" }}>
            <Frame>
              <Loading />
            </Frame>
          </div>
        )}

        <Card title="Add Product " sectioned>
          <TextContainer>
            {options.map((item, idx) => {
              return (
                <Select
                  key={idx}
                  // label="Date range"
                  options={options[idx]}
                  onChange={(value) => {
                    // debugger;

                    if (idx < selected.length) {
                      setShowAttrs(false);
                      setAttrCounter(0);
                      setSelectedAttrs([]);
                    }

                    let temp = selected;
                    temp = temp.slice(0, idx);
                    temp[idx] = value;
                    setAttr({ ...attr, category: productData[value].category });
                    setSelected([...temp]);
                    setOptions(options.slice(0, idx + 1));
                  }}
                  value={selected?.[idx]}
                />
              );
            })}
          </TextContainer>

          {showAttrs && (
            <>
              <TextContainer>
                <p>&nbsp;</p>
                {/* <Heading>Attributes</Heading> */}
                <Button
                  primary
                  onClick={() => setAttrCounter(attrCounter + 1)}
                  loading={isLoading}
                >
                  Add Attribute
                </Button>
                {isLoading && <p>Loading Attributes</p>}
                <FormLayout>
                  {Array(attrCounter)
                    .fill(0)
                    .map((item, idx) => {
                      return (
                        <Card sectioned>
                          <FormLayout.Group>
                            <Button
                              plain
                              textAlign="right"
                              onClick={(event) => {
                                // debugger;
                                console.log(event, idx);
                                selectedAttrs.splice(idx, 1);
                                setSelectedAttrs([...selectedAttrs]);
                                setAttrCounter(attrCounter - 1);
                                // setAttrOptions(attrOptions.slice(idx, idx + 1));
                                // setSelectedAttrs(selectedAttrs.slice(idx, idx));
                              }}
                            >
                              Delete
                            </Button>
                          </FormLayout.Group>
                          <FormLayout.Group>
                            {/* <Button>Add product</Button> */}
                            <Select
                              key={idx}
                              label="Select Attribute"
                              options={createAttrs(idx)}
                              onChange={(value) => {
                                // debugger;
                                const temp = selectedAttrs;
                                temp[idx] = value;
                                // setAttr({ ...attr, category: productData[value].category });
                                setSelectedAttrs([...temp]);
                                // setAttrOptions([...attrOptions]);
                              }}
                              value={selectedAttrs?.[idx]}
                            />
                            <TextField
                              type="text"
                              label="Input"
                              onChange={() => {}}
                              autoComplete="off"
                            />
                          </FormLayout.Group>
                        </Card>
                      );
                    })}
                </FormLayout>
              </TextContainer>
            </>
          )}
        </Card>
      </>
    </Page>
  );
}

export default Home;
