package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Entry struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	Name       *string            `json:"name"`
	Plot       *string            `json:"plot"`
	Impression *string            `json:"impression"`
	Rating     *float64           `json:"rating"`
}
